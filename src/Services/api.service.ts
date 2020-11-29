import { RecordType } from "../Components/Users/Table";

export const API_URL = "http://localhost:5000";

export async function fetchRecordsAPI() {
  return fetch(`${API_URL}/users`)
    .then((response) => response.json())
    .catch((error: any) => console.log(error)); //FIXME: unlock on db maintenance
}

export async function deleteRecordAPI(id: number) {
  return fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      console.log(error);
    }
  });
}
export async function deleteSelectedAPI(ids: any[]) {
  var data = ids.join(",");
  return fetch(`${API_URL}/users/selected/${data}`, {
    method: "DELETE",
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      console.log(error);
    }
  });
}

export async function addRecordAPI(record: RecordType) {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(record),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  });
}

export async function fetchCategoriesAPI() {
  return fetch(`${API_URL}/teachers`).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  });
}

export async function changeRecordAPI(record: RecordType) {
  return fetch(`${API_URL}/users/${record.id}`, {
    method: "PATCH",
    body: JSON.stringify(record),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  });
}

export async function changeSelectedAPI(category: any, ids: any[]) {
  var objs = ids.join(",");
  return fetch(`${API_URL}/users/${objs}`, {
    method: "PATCH",
    body: JSON.stringify(category),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  });
}
