const AGENDA_SLUG = "luis-sarmiento-contacts";

export const initialStore = () => {
  return {
    contacts: [],
    loading: false,
    error: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_loading":
      return { ...store, loading: action.payload };

    case "set_error":
      return { ...store, error: action.payload };

    case "set_contacts":
      return { ...store, contacts: action.payload, loading: false };

    case "add_contact":
      return { ...store, contacts: [...store.contacts, action.payload] };

    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload),
      };

    default:
      throw Error("Unknown action: " + action.type);
  }
}

export const SLUG = AGENDA_SLUG;