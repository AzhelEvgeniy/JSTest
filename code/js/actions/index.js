export const edit = (id) => {
  return {
      type: "USER_EDITED",
      payload: id
  }
};

export const deleteUser = (id) => {
  return {
      type: "USER_DELETE",
      payload: id
  }
};

export const addUser = () => {
  return {
      type: "USER_ADD"
  }
};

export const submit = () => {
  return {
      type: "SAVE_DB"
  }
};

export const sorted = (field) => {
  return {
    type: "SORT_ID",
    payload: field
  };
};

export const filter = (field, value) => {
  return {
    type: "FILTER",
    field: field,
    payload: value
  };
};
