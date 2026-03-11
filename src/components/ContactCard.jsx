export const ContactCard = (props) => {
  let contact = props.contact;
  let onEdit = props.onEdit;
  let onDelete = props.onDelete;

  var initials = "?";
  if (contact.name != undefined && contact.name != "") {
    initials = contact.name.split(" ").map((n) => n[0]).join("").toUpperCase();
    if (initials.length > 2) {
      initials = initials.slice(0, 2);
    }
  }

  const avatarStyle = {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px"
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center">

          <div style={avatarStyle} className="me-3">
            {initials}
          </div>

          <div className="flex-grow-1">
            <h5 className="mb-1">{contact.name}</h5>
            {contact.address &&
              <p className="mb-0 text-muted small">📍 {contact.address}</p>
            }
            {contact.phone &&
              <p className="mb-0 text-muted small">📞 {contact.phone}</p>
            }
            {contact.email &&
              <p className="mb-0 text-muted small">✉️ {contact.email}</p>
            }
          </div>

          <div>
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={onEdit}>
              ✏️
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
              🗑️
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};