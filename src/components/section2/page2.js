'use client'
import { useEffect,useState } from "react"
import style from "./style.module.css"
import Countdown from 'react-countdown'
import { FaRegCalendarCheck } from "react-icons/fa6";
import  PropTypes from 'prop-types'
import AnimateSee from "@/animation/animateSee/page";


export default function Page2 ({data}){
  
    const [isClient, setIsClient] = useState(false);
    const WeddingDay = data?.date?.all
    
    const wedingDate =  new Date(`${WeddingDay}T10:00:00`)

    useEffect(() => {
      setIsClient(true);
    }, []);
// Renderer callback with condition
const renderer = ({days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <div style={{  fontSize: '2rem', textAlign: 'center' }} className="flex mx-7 text-white p-2 justify-between">
        <div className="border rounded-lg bg-white bg-opacity-15 w-[4rem] h-[3.5rem]  flex justify-center items-center">
             <div className="leading-6 text-xl font-bold">
                00
                <p className="text-sm">Hari</p>
             </div>
        </div>
        <div className="border rounded-lg bg-white bg-opacity-15 w-[4rem] h-[3.5rem]  flex justify-center items-center">
             <div className="leading-6 text-xl font-bold">
                00
                <p className="text-sm">Jam</p>
             </div>
        </div>
        <div className="border rounded-lg bg-white bg-opacity-15 w-[4rem] h-[3.5rem]  flex justify-center items-center">
             <div className="leading-6 text-xl font-bold">
                00
                <p className="text-sm">menit</p>
             </div>
        </div>
        <div className="border rounded-lg bg-white bg-opacity-15 w-[4rem] h-[3.5rem]  flex justify-center items-center">
             <div className="leading-6 text-xl font-bold">
                00
                <p className="text-sm">Detik</p>
             </div>
        </div>
      </div>
    );
  } else {
    // Render a countdown
    return (
        <div style={{  fontSize: '2rem', textAlign: 'center' }} className="flex mx-7 text-white p-2 justify-between">
        <div className="border rounded-lg bg-white bg-opacity-15 w-[4rem] h-[3.5rem]  flex justify-center items-center">
             <div className="leading-6 text-xl font-bold">
                {days}
                <p className="text-sm">Hari</p>
             </div>
        </div>
        <div className="border rounded-lg bg-white bg-opacity-15 w-[4rem] h-[3.5rem]  flex justify-center items-center">
             <div className="leading-6 text-xl font-bold">
                {hours}
                <p className="text-sm">Jam</p>
             </div>
        </div>
        <div className="border rounded-lg bg-white bg-opacity-15 w-[4rem] h-[3.5rem]  flex justify-center items-center">
             <div className="leading-6 text-xl font-bold">
                {minutes}
                <p className="text-sm">menit</p>
             </div>
        </div>
        <div className="border rounded-lg bg-white bg-opacity-15 w-[4rem] h-[3.5rem]  flex justify-center items-center">
             <div className="leading-6 text-xl font-bold">
                {seconds}
                <p className="text-sm">Detik</p>
             </div>
        </div>
      </div>
    );
  }
};

const handleSaveDate = () => {
  const startDate = wedingDate.toISOString().replace(/-|:|\.\d\d\d/g,"").split(".")[0] + "Z"; // format UTC
  const endDate = new Date(wedingDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g,"").split(".")[0] + "Z"; // 2 jam setelah acara
  const eventTitle = `Wedding of ${data?.name?.mens} & ${data?.name?.grils}`;
  const eventDetails = `Join us in celebrating the wedding of ${data?.name?.mens} & ${data?.name?.grils}.`;
  const eventLocation = "Bojonegoro, Indonesia";

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;
  
  window.open(calendarUrl, '_blank');
};

    return(
      <section>
        <section className={style.bg} id="page2">
          <div className={style.afterBg}></div>
            {/* <div className="relative h-[100vh] z-40"> */}
            <div className=" absolute top-0 flex-row h-screen  justify-center w-full items-center">
                <div className="pt-12  text-center ">
                    <AnimateSee>
                    <p>The Wedding Of</p>
                    <div className="sacramento text-gray-950  font-bold text-4xl shadow-text py-5 flex justify-center items-center grid-cols-3 gap-1">
                      <h1>{data?.name?.nameOne}</h1>
                       <h1 className="text-5xl px-1">&</h1> 
                       <h1>{data?.name?.nameTwo}</h1>
                    </div>
                    </AnimateSee>
                    <AnimateSee>
                    <div className="pt-[50vh] ">
                    {isClient && <Countdown
                        date={wedingDate}
                        renderer={renderer}
                    />}
                    </div>
                    <button 
                    className="bg-white  p-2 mx-auto my-5 font-bold text-xl italic flex justify-center items-center rounded-lg" 
                    onClick={handleSaveDate}
                    >
                      <FaRegCalendarCheck className="mr-3" />
                      Save The Date
                    </button>
                    </AnimateSee>
                </div>
            </div>
            {/* </div> */}
 
        </section>
      </section>  
    )
}

Page2.propTypes = {
  data: PropTypes.string.isRequired
}