import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API = "https://playground.4geeks.com/contact";
const SLUG = "luis-sarmiento-contacts";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const params = useParams();
  const isEditing = params.id ? true : false;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing == true) {
      let contact = store.contacts.find((c) => c.id == params.id);
      if (contact) {
        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone);
        setAddress(contact.address);
      }
    }
  }, []);

  const handleSave = async () => {
    if (name == "") {
      setError("Please enter a name");
      return;
    }

    setSaving(true);

    const contactData = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    if (isEditing) {
      let res = await fetch(API + "/agendas/" + SLUG + "/contacts/" + params.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      let data = await res.json();
      console.log("updated:", data);
      dispatch({ type: "update_contact", payload: data });
    } else {
      let res = await fetch(API + "/agendas/" + SLUG + "/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      let data = await res.json();
      console.log("created:", data);
      dispatch({ type: "add_contact", payload: data });
    }

    setSaving(false);
    navigate("/");
  };

  return (
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <h1 class="text-center mb-4">
            {isEditing ? "Edit Contact" : "Add a new contact"}
          </h1>

          {error != "" &&
            <div class="alert alert-danger">{error}</div>
          }

          <div class="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label>Phone</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label>Address</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            class="btn btn-primary w-100"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "save"}
          </button>

          <br />
          <br />

          <a onClick={() => navigate("/")} style={{ cursor: "pointer", color: "blue" }}>
            or get back to contacts
          </a>

        </div>
      </div>
    </div>
  );
};