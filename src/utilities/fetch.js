const url = `http://localhost:3000/people`;

export async function addPerson(data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...data
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deletePerson(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getPeople() {
  try {
    let response = await fetch(url);
    response = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function changePerson(data, id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...data
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getPerson(id) {
  try {
    let response = await fetch(`${url}/${id}`);
    response = await response.json();
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}
