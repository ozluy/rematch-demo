import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'

const GitHub = ({ kullaniciRepolariniGetir, yukleniyor, repolar, hata }) => {
  const [kullaniciAdi, setKullaniciAdi] = useState('ozluy')
  const [yildizSirali, setYildizSirali] = useState(false)
  const inputReferansim = useRef(null)

  const repolariDOMaIsle = reposFromAPI => {
    const repoListesi = yildizSirali
      ? [...reposFromAPI, ...[]].sort(
          (x, y) => y.stargazers_count - x.stargazers_count
        )
      : reposFromAPI
    return (
      <>
        {repoListesi.length > 0 && (
          <>
            <input
              id='sirala'
              onChange={() => setYildizSirali(!yildizSirali)}
              type='checkbox'
              checked={yildizSirali}
            />{' '}
            <label htmlFor='sirala'>Yıldıza göre sırala</label>
          </>
        )}
        <ul>
          {repoListesi.map(
            ({ name, html_url, language, stargazers_count, forks_count }) => (
              <li key={name}>
                <a target='_blank' href={html_url} rel='noopener noreferrer'>
                  {name}/{language}, {stargazers_count}⭐️, {forks_count}🍴
                </a>
              </li>
            )
          )}
        </ul>
      </>
    )
  }

  return (
    <form
      className='github-wrapper'
      onSubmit={event => {
        event.preventDefault()
        setYildizSirali(false)
        kullaniciRepolariniGetir(kullaniciAdi)
      }}
    >
      <h1>Github</h1>
      <input
        type='text'
        onChange={() => setKullaniciAdi(inputReferansim.current.value)}
        value={kullaniciAdi}
        ref={inputReferansim}
        placeholder='Kullanıcı adi gir'
      />

      <button type='submit'>Repoları Getir</button>
      <p>&nbsp;{yukleniyor && 'repolar getiriliyor...'}</p>
      {hata && <p className='error-message'>{hata.message}</p>}
      {repolariDOMaIsle(repolar)}
    </form>
  )
}

const mapState = ({ github: { repolar, yukleniyor, hata } }) => ({
  repolar,
  yukleniyor,
  hata,
})

const mapDispatch = ({ github: { kullaniciRepolariniGetir } }) => ({
  kullaniciRepolariniGetir,
})

export default connect(
  mapState,
  mapDispatch
)(GitHub)
