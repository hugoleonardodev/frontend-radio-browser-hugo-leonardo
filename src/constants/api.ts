// export const API_BASE_URL = 'https://prod-operacao-urban.onrender.com'

export const API_BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://prod-operacao-urban.onrender.com'
