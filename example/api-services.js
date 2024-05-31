class ApiServices {
  host = "https://api.github.com"


  async getUserDetail(username) {
    try {
      const res = await fetch(`${this.host}/users/${username}`, {method: 'get'})
      let response = {
        ok: res.ok,
        status: res.status,
      }

      const data = await res.json()
      if (response.ok) {
        return {...response, data}
      } else {
        return {...response, data}
      }
    } catch (error) {
      return error
    }
  }
}

const apiServices = new ApiServices()
export default apiServices;