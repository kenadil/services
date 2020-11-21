import { RecordType } from "../Components/Users/Table";

const API_URL = "http://localhost:3001";

export async function fetchRecordsAPI() {
  return fetch(`${API_URL}/users`)
    .then((response) => response.json())
    .catch((error: any) => console.log(error)); //FIXME: unlock on db maintenance
}

export async function deleteRecordAPI(id: number) {
  console.log(id);
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
    method: 'PATCH',
    body: JSON.stringify(record),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  })
}
