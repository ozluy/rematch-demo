import React from 'react'
import { connect } from 'react-redux'

const Sayac = ({ deger, birEkle, birEkleAsync, yukleniyor }) => (
  <div>
    <h1>Sayaç değeri = {deger}</h1>
    <button
      onClick={event => {
        event.persist()
        birEkle()
      }}
    >
      +1
    </button>
    <button
      onClick={event => {
        event.persist()
        birEkleAsync()
      }}
    >
      +1 async (1 saniye sonra)
    </button>
    <p>&nbsp;{yukleniyor && 'sayaça 1 ekleniyor...'}</p>
  </div>
)

const mapState = ({ sayac: { deger, yukleniyor } }) => ({
  deger,
  yukleniyor,
})

const mapDispatch = ({ sayac: { birEkle, birEkleAsync } }) => ({
  birEkle,
  birEkleAsync,
})

export default connect(
  mapState,
  mapDispatch
)(Sayac)
