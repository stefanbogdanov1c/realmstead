const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Noble = require('./models/noble.model');
const Family = require('./models/family.model');
const City = require('./models/city.model');
const Kingdom = require('./models/kingdom.model');

const app = express();


mongoose.connect('mongodb://localhost:27017/realmstead');

app.use(cors());
app.use(bodyParser.json());

app.get('/search', async (req, res) => {
  const query = req.query.query || '';

  try {
    // Create a regex pattern for partial matching
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive

    // Search in each collection using the regex pattern
    const nobles = await Noble.find({
      $or: [
        { name: { $regex: regex } },
        { lastName: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    const families = await Family.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    const cities = await City.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    const kingdoms = await Kingdom.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    res.json({ nobles, families, cities, kingdoms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * NOBLE REQUESTS
 */

// POST a new noble
app.post('/api/nobles', (req, res) => {
  const newNoble = new Noble(req.body);
  newNoble.save()
    .then(savedNoble => {
      res.status(201).json(savedNoble);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET a list of nobles
app.get('/api/nobles', (req, res) => {
  Noble.find()
    .then(nobles => {
      res.status(200).json(nobles);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET a single noble by ID
app.get('/api/nobles/:id', (req, res) => {
  const nobleId = req.params.id;

  Noble.findById(nobleId)
    .then(noble => {
      if (!noble) {
        return res.status(404).json({ error: 'Noble not found' });
      }
      res.json(noble);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE a single noble by ID
app.delete('/api/nobles/:id', (req, res) => {
  const nobleId = req.params.id;

  Noble.findByIdAndDelete(nobleId)
    .then(deletedNoble => {
      if (!deletedNoble) {
        return res.status(404).json({ error: 'Noble not found' });
      }
      res.json({ message: 'Noble deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Update a single noble by ID
app.put('/api/nobles/:id', async (req, res) => {
  const nobleId = req.params.id;
  const updateObject = { ...req.body };
  const unsetObject = {};

  // Check for fields to unset
  if (!updateObject.hasOwnProperty('spouseId')) {
    unsetObject.spouseId = "";
  }
  if (!updateObject.hasOwnProperty('motherId')) {
    unsetObject.motherId = "";
  }
  if (!updateObject.hasOwnProperty('fatherId')) {
    unsetObject.fatherId = "";
  }

  // Create the update query
  const updateQuery = {
    ...updateObject,
    ...(Object.keys(unsetObject).length > 0 ? { $unset: unsetObject } : {}),
  };

  try {
    // Update noble document
    const updatedNoble = await Noble.findByIdAndUpdate(
      nobleId,
      updateQuery,
      { new: true } // To return the updated document
    );

    if (!updatedNoble) {
      return res.status(404).json({ error: 'Noble not found' });
    }

    res.json(updatedNoble);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * FAMILY REQUESTS
 */

// POST a new family
app.post('/api/families', (req, res) => {
  const familyData = req.body;

  // Sanitize input to convert empty strings to null
  if (familyData.rulerId === '') {
    familyData.rulerId = null;
  }
  if (familyData.founderId === '') {
    familyData.founderId = null;
  }
  familyData.members = familyData.members.map(member => member === '' ? null : member);

  const newFamily = new Family(familyData);
  newFamily.save()
    .then(savedFamily => {
      res.status(201).json(savedFamily);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET all families
app.get('/api/families', (_req, res) => {
  Family.find()
    .then(families => {
      res.json(families);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET a single family by ID
app.get('/api/families/:id', (req, res) => {
  const familyId = req.params.id;

  Family.findById(familyId)
    .then(family => {
      if (!family) {
        return res.status(404).json({ error: 'Family not found' });
      }
      res.json(family);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// PUT (update) a single family by ID
app.put('/api/families/:id', (req, res) => {
  const familyId = req.params.id;

  Family.findByIdAndUpdate(familyId, req.body, { new: true })
    .then(updatedFamily => {
      if (!updatedFamily) {
        return res.status(404).json({ error: 'Family not found' });
      }
      res.json(updatedFamily);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE a single family by ID
app.delete('/api/families/:id', (req, res) => {
  const familyId = req.params.id;

  Family.findByIdAndDelete(familyId)
    .then(deletedFamily => {
      if (!deletedFamily) {
        return res.status(404).json({ error: 'Family not found' });
      }
      res.json({ message: 'Family deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * CITY REQUESTS
 */

// POST a new city
app.post('/api/cities', (req, res) => {
  const newCity = new City(req.body);
  newCity.save()
    .then(savedCity => {
      res.status(201).json(savedCity);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET all cities
app.get('/api/cities', (req, res) => {
  City.find()
    .then(cities => {
      res.status(200).json(cities);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET a single city by ID
app.get('/api/cities/:id', (req, res) => {
  const cityId = req.params.id;

  City.findById(cityId)
    .then(city => {
      if (!city) {
        return res.status(404).json({ error: 'City not found' });
      }
      res.json(city);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE a single city by ID
app.delete('/api/cities/:id', (req, res) => {
  const cityId = req.params.id;

  City.findByIdAndDelete(cityId)
    .then(deletedCity => {
      if (!deletedCity) {
        return res.status(404).json({ error: 'City not found' });
      }
      res.json({ message: 'City deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Update a single city by ID
app.put('/api/cities/:id', async (req, res) => {
  const cityId = req.params.id;
  const updateObject = { ...req.body };
  const unsetObject = {};

  // Check for fields to unset
  if (!updateObject.hasOwnProperty('population')) {
    unsetObject.population = "";
  }
  if (!updateObject.hasOwnProperty('description')) {
    unsetObject.description = "";
  }

  // Create the update query
  const updateQuery = {
    ...updateObject,
    ...(Object.keys(unsetObject).length > 0 ? { $unset: unsetObject } : {}),
  };

  try {
    // Update city document
    const updatedCity = await City.findByIdAndUpdate(
      cityId,
      updateQuery,
      { new: true } // To return the updated document
    );

    if (!updatedCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * KINGDOM REQUESTS
 */
// POST a new kingdom
app.post('/api/kingdoms', (req, res) => {
  const kingdomData = req.body;

  // Sanitize input to convert empty strings to null
  if (kingdomData.rulerId === '') {
    kingdomData.rulerId = null;
  }
  if (kingdomData.rulerFamilyId === '') {
    kingdomData.rulerFamilyId = null;
  }
  if (kingdomData.capitalId === '') {
    kingdomData.capitalId = null;
  }
  kingdomData.vassalFamiliesIds = kingdomData.vassalFamiliesIds.map(familyId => familyId === '' ? null : familyId);

  const newKingdom = new Kingdom(kingdomData);
  newKingdom.save()
    .then(savedKingdom => {
      res.status(201).json(savedKingdom);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET all kingdoms
app.get('/api/kingdoms', (req, res) => {
  Kingdom.find()
    .then(kingdoms => {
      res.json(kingdoms);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET a single kingdom by ID
app.get('/api/kingdoms/:id', (req, res) => {
  const kingdomId = req.params.id;

  Kingdom.findById(kingdomId)
    .populate('ruler rulerFamily vassalFamilies capital')
    .exec()
    .then(kingdom => {
      if (!kingdom) {
        return res.status(404).json({ error: 'Kingdom not found' });
      }
      res.json(kingdom);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// PUT (update) a single kingdom by ID
app.put('/api/kingdoms/:id', (req, res) => {
  const kingdomId = req.params.id;

  // Preprocess the request body to handle empty strings
  const preprocessBody = (body) => {
    for (const key in body) {
      if (body[key] === '') {
        body[key] = null;
      }
    }
  };

  preprocessBody(req.body);

  Kingdom.findByIdAndUpdate(kingdomId, req.body, { new: true })
    .then(updatedKingdom => {
      if (!updatedKingdom) {
        return res.status(404).json({ error: 'Kingdom not found' });
      }
      res.json(updatedKingdom);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE a single kingdom by ID
app.delete('/api/kingdoms/:id', (req, res) => {
  const kingdomId = req.params.id;

  Kingdom.findByIdAndDelete(kingdomId)
    .then(deletedKingdom => {
      if (!deletedKingdom) {
        return res.status(404).json({ error: 'Kingdom not found' });
      }
      res.json({ message: 'Kingdom deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});