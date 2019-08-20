// github modeli
export default {
  state: { repolar: [], yukleniyor: false, hata: null }, // initial state
  reducers: {
    yukleniyoruAyarla: (state, payload) => ({
      ...state,
      ...{ yukleniyor: payload },
    }),
    repolariAyarla: (state, payload) => ({
      ...state,
      ...{ repolar: payload, hata: null },
    }),
    hataAyarla: (state, payload) => ({
      ...state,
      ...{ hata: payload, repolar: [] },
    }),
  },
  effects: dispatch => ({
    kullaniciRepolariniGetir: payload => {
      dispatch.github.yukleniyoruAyarla(true)
      fetch(`https://api.github.com/users/${payload}/repos`)
        .then(response => {
          if (response.status === 404) {
            throw new Error('Kullanıcı bulunamadı!')
          } else {
            return response.json()
          }
        })
        .then(myJson => {
          dispatch.github.yukleniyoruAyarla(false)
          dispatch.github.repolariAyarla(myJson)
        })
        .catch(error => {
          dispatch.github.yukleniyoruAyarla(false)
          dispatch.github.hataAyarla(error)
        })
    },
  }),
}
