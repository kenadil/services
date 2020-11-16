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
    })
}
