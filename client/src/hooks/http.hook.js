import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            if (!response.ok) {
                console.log("Data from server!", data);
                if (data.errors[1]) {
                    throw new Error(data.errors[0].msg + '&nbsp;&nbsp;' + data.errors[1].msg || 'Что-то пошло не так!')
                } else if (data.errors[0]) {
                    throw new Error(data.errors[0].msg || 'Что-то пошло не так!')
                }
                throw new Error(data.message || 'Что-то пошло не так!')
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])
    
    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}