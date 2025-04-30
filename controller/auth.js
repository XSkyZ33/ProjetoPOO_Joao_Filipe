const API_BASE_URL = 'http://localhost:3000';
const ENDPOINT = '/user';

export async function login(email, password) {
    try {
        const res = await fetch(`${API_BASE_URL}${ENDPOINT}?email=${email}&password=${password}`);
        const data = await res.json();

        if (data.length > 0) {
            return { success: true, user: data[0] };
        } else {
            return { success: false, message: 'Email ou senha inválidos.' };
        }
    } catch (error) {
        return { success: false, message: 'Erro ao conectar ao servidor.' };
    }
}