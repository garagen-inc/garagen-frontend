export class StorageService {
  static setItem(key: string, value: any): void {
    try {
      const stringValue = JSON.stringify(value)
      localStorage.setItem(key, stringValue)
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error)
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue) {
        return JSON.parse(storedValue) as T
      }
      return null
    } catch (error) {
      console.error('Erro ao recuperar do localStorage:', error)
      return null
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error)
    }
  }

  static clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Erro ao limpar o localStorage:', error)
    }
  }
}

export default new StorageService()
