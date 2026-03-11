import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

const API = "https://playground.4geeks.com/contact";
const SLUG = "luis-sarmiento-contacts";

export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    dispatch({ type: "set_loading", payload: true });
    let res = await fetch(API + "/agendas/" + SLUG + "/contacts");
    if (res.status == 404) {
      await fetch(API + "/agendas/" + SLUG, { method: "POST" });
      dispatch({ type: "set_contacts", payload: [] });
      return;
    }
    let data = await res.json();
    console.log("contacts data:", data);
    dispatch({ type: "set_contacts", payload: data.contacts });
  };

  function handleOpenModal(contact) {
    setDeleteModal(contact);
  }

  function handleCloseModal() {
    setDeleteModal(null);
  }

  const handleDelete = async () => {
    setDeleting(true);
    let url = API + "/agendas/" + SLUG + "/contacts/" + deleteModal.id;
    await fetch(url, { method: "DELETE" });
    dispatch({ type: "delete_contact", payload: deleteModal.id });
    setDeleting(false);
    setDeleteModal(null);
  };

  return (
    <div className="container mt-5">

      <div className="row mb-4">
        <div className="col">
          <h1>My Contacts</h1>
        </div>
        <div className="col text-end">
          <button onClick={() => navigate("/add-contact")} className="btn btn-success">
            + Add new contact
          </button>
        </div>
      </div>

      {store.loading == true && (
        <div className="text-center">
          <div className="spinner-border text-success"></div>
          <p>Loading...</p>
        </div>
      )}

      {store.contacts.length == 0 && store.loading == false &&
        <div className="text-center mt-5">
          <p style={{ fontSize: "50px" }}>👤</p>
          <h4>No contacts yet</h4>
          <button className="btn btn-success" onClick={() => navigate("/add-contact")}>
            Add your first contact
          </button>
        </div>
      }

      <div>
        {store.contacts.map(function(contact, index) {
          return (
            <ContactCard
              key={index}
              contact={contact}
              onEdit={() => navigate("/edit-contact/" + contact.id)}
              onDelete={() => handleOpenModal(contact)}
            />
          );
        })}
      </div>

      {deleteModal != null &&
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Contact</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body text-center">
                  <p style={{ fontSize: "40px" }}>🗑️</p>
                  <p>Are you sure you want to delete <b>{deleteModal.name}</b>?</p>
                  <p className="text-muted">This cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={handleCloseModal} disabled={deleting}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                    {deleting ? "Deleting..." : "Yes, delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      }

    </div>
  );
};