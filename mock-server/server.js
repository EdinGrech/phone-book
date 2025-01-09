// Import required modules
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Use middleware
app.use(cors());
app.use(express.json());

// Mock data
const contactSummaries = [
  { id: 1, name: "John", surname: "Doe" },
  { id: 2, name: "Jane", surname: "Smith" },
  { id: 3, name: "Alice", surname: "Johnson" },
];

const contacts = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    address: "123 Elm Street",
    city: "Metropolis",
    state: "NY",
    zip: "10001",
  },
  {
    id: 2,
    name: "Jane",
    surname: "Smith",
    phone: "987-654-3210",
    email: "jane.smith@example.com",
    address: "456 Oak Avenue",
    city: "Gotham",
    state: "CA",
    zip: "90001",
  },
  {
    id: 3,
    name: "Alice",
    surname: "Johnson",
    phone: "555-123-4567",
    email: "alice.johnson@example.com",
    address: "789 Maple Road",
    city: "Star City",
    state: "TX",
    zip: "75001",
  },
];

// API endpoints
app.get("/api/contacts", (req, res) => {
  res.json({
    data: contactSummaries,
    error: "",
  });
});

app.get("/api/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id, 10);
  const contact = contacts.find((c) => c.id === contactId);

  if (contact) {
    res.json({
      data: contact,
      error: "",
    });
  } else {
    res.status(404).json({
      data: null,
      error: "Contact not found",
    });
  }
});

app.post("/api/contacts", (req, res) => {
  const newContact = req.body.contact;
  if (!newContact) {
    return res.status(400).json({
      data: null,
      error: "Invalid contact data",
    });
  }

  contacts.push(newContact);
  contactSummaries.push({
    id: Math.floor(Math.random() * 1000),
    name: newContact.name,
    surname: newContact.surname,
  });

  res.status(201).json({
    data: newContact,
    error: "",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Mock server is running on http://localhost:${port}`);
});
