// sayac modeli
export default {
  state: {
    yukleniyor: false,
    deger: 0,
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    birEkle: state => ({ ...state, ...{ deger: state.deger + 1 } }),
    yukleniyoruAyarla: (state, payload) => ({ ...state, ...{ yukleniyor: payload } }),
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    birEkleAsync: async () => {
      dispatch.sayac.yukleniyoruAyarla(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.sayac.yukleniyoruAyarla(false)
      dispatch.sayac.birEkle()
    },
  }),
}
