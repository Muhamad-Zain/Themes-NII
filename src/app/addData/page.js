'use client'
import { addDataToFirebase, login } from "@/components/firebase/initialFirebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react"


export default function AddData() {
    const [id, setId] = useState('N2-')
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState('')
    const [data, setData]= useState({
        name:{nameOne:'',nameTwo:'',namaLengkap:{nameOne:'',nameTwo:''}},
        date:{akad:{date:'',day:'',month:'',time:''},resepsi:{date:'',day:'',month:'',time:''},all:'',years:''},
        location:{akad:{link:'', location:''},resepsi:{link:'', location:''}},
        gift:{one:{nameBank:'',rek:'',an:''},two:{nameBank:'',rek:'',an:''}},
        parent:{nameOne:'',nameTwo:''},
        sosmed:{mens:{ig:'',facebook:''},grils:{ig:'',facebook:''}},
        expresion:''

    })
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAutentication(true)
      }else{
        setAutentication(false)
      }
    })

  const updateNestedState = (path, value) => {
    setData(prevData => {
      const keys = path.split(".");
      const lastKey = keys.pop();
      const deepObject = keys.reduce((acc, key) => acc[key] = { ...acc[key] }, prevData);
      deepObject[lastKey] = value;
      return { ...prevData };
    });
  };
    const handleChange = e => {
        const { name, value } = e.target;
        updateNestedState(name, value);
      };

    const handleSend = async (e) => {
        e.preventDefault()
        try {
          setLoading(true)
          await addDataToFirebase(id,data)
          // setData('')
          setLoading(false)
          setParams(`https://themes-nii.vercel.app/${id}`)
        } catch (error) {
          console.log(error);
          
        }

        
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [autentication, setAutentication] = useState(false)
    const [load, setLoad] = useState(false)
    // console.log(email,password);
    
    const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
        setLoad(true)
        const auth = await login(email, password)
      console.log(auth);
      
      if (auth === true) {
        setAutentication(true)
      }
      setLoad(false)
      } catch (error) {
        console.log(error);
        
      }
    }
    return(
        <section className="min-h-screen bg-slate-400 p-5 max-w-[400px] m-auto">
            {autentication === true ? (
              <>
              <div>
              <h3 className="text-center text-2xl font-serif italic">Add Date to template  start-1</h3>
              <input className="p-2 rounded-md outline-none mt-10" value={id} placeholder="Buat id" onChange={(e) => setId(e.target.value)} required />
              <form onSubmit={handleSend}  className="mb-10">
                  <label className="text-xl italic font-bold">Nama</label>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="name.nameOne"required placeholder="Nama" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="name.nameTwo"required placeholder="Nama" />

                  <label className="text-xl italic font-bold">Nama Lengkap</label>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="name.namaLengkap.nameOne"required placeholder="Nama Lengkap"/>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="name.namaLengkap.nameTwo"required placeholder="Nama Lengkap"/>

                  <label className="text-xl italic font-bold">Nama Orang Tua</label>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="parent.nameOne"required placeholder="ex. Putra pertama dari ... " />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="parent.nameTwo"required placeholder="ex. Putra pertama dari ... " />

                  <label className="text-xl italic font-bold">Date</label>
                  <p>Akad</p>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.akad.date"required placeholder="Tanggal ex.02" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.akad.day"required placeholder="Hari ex.Minggu" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.akad.month"required placeholder="Bulan ex.Nov" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.akad.time"required placeholder="Waktu ex.02.00" />
                  <p>Resepsi</p>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.resepsi.date"required placeholder="Tanggal ex.02" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.resepsi.day"required placeholder="Hari ex.Minggu" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.resepsi.month"required placeholder="Bulan ex.Nov" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.resepsi.time"required placeholder="Waktu ex.02.00" />
                  <p>tgl-bln-thn</p>
                  <input type="date" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.all"required placeholder="Tahun" />
                  <p>Tahun</p>
                  <input type="number" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="date.years"required placeholder="Tahun ex.2025" />

                  <label className="text-xl italic font-bold">Location</label>
                  <p>Akad</p>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="location.akad.link"required placeholder="link" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="location.akad.location"required placeholder="jl.Sudirman" />
                  <p>Resepsi</p>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="location.resepsi.link"required placeholder="link" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="location.resepsi.location"required placeholder="jl.Sudirman" />

                  <label className="text-xl italic font-bold">Gift</label>
                  <p>01</p>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="gift.one.nameBank" placeholder="Nama Bank" />
                  <input type="number" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="gift.one.rek" placeholder="Nomor Rekening" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="gift.one.an" placeholder="a.n" />
                  <p>02</p>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="gift.two.nameBank" placeholder="Nama Bank" />
                  <input type="number" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="gift.two.rek" placeholder="Nomor Rekening" />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="gift.two.an" placeholder="a.n" />

                  <label className="text-xl italic font-bold">Link Sosmed</label>   
                  <p>mens</p>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="sosmed.mens.ig" placeholder="Link Instagram " />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="sosmed.mens.facebook" placeholder="Link Facebook " />
                  <p>grils</p>
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="sosmed.grils.ig" placeholder="Link Instagram " />
                  <input type="text" className="p-2  rounded-md outline-none w-full mb-2" onChange={handleChange} name="sosmed.grils.facebook" placeholder="Link Facebook " />
                  <button type="submit" disabled={loading ? true :false} className="bg-green-500 p-2 w-full rounded-md border my-10">{loading ? 'loading...' : 'Add to Firebase'}</button>
              </form>
          </div>
            <div className={id === '' ? 'hidden' :'visible'}>
              <p>Link: {params}</p>
              <button className="bg-green-800 p-1 rounded-md border px-4 ">Salin</button>
            </div>
          {loading ? (
            <div className="w-full h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-10"></div>
          ):null}
          </>
            ):(
              <section className="flex justify-center items-center h-screen">
                <form onSubmit={handleSubmit}>
                  <h3 className="text-center text-2xl pb-5 font-serif">Autentication Owner</h3>
                  <label>Username</label>
                  <input type="text"  className="p-2 rounded-md w-full" onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
                  <label>Password</label>
                  <input type="text" className="p-2 rounded-md w-full" onChange={(e)=> setPassword(e.target.value)} placeholder="password" />
                  <button type="submit" className="p-2 rounded-md bg-green-700 border my-5 w-full">{ load ? 'loading...' : 'Masuk'}</button>
                </form>
              </section>
            )}
        </section>
    )
}