import instance from ".";

export async function createDoc(token: string) {
  return instance.post('/documents/create', {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}