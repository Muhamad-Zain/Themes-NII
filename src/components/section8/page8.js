import Image from "next/image";
import ImgCouple from '@/assets/img/couple.png'
import { FaWhatsapp } from "react-icons/fa";
import AnimateSee from "@/animation/animateSee/page";
import PropTypes from "prop-types";
import AnimatedSection from "@/animation/animateToUp/animate";



export default function Page8({data}) {
    return(
        <section className="bg-[#bd7e48]  py-20">
            <AnimatedSection>
                <div className="w-10/12 rounded-xl pt-2 m-auto border-4 border-double  ">
                    <Image src={ImgCouple} alt='' />
                </div>
                <div className='text-white text-center py-5 px-7 italic  font-sans text-sm '>
                    <p>
                        Merupakan suatu kebahagiaan dan kehormatan bagi kami,
                        apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan doa restu kepada kami.<br/>
                        Atas do`a dan restunya kami ucapkan terima kasih  
                    </p>
                    <p className='font-bold'>Wassalamu`alaikum wr. wb.</p>
                    <h1 className="pt-10 font-bold">Dari kami yang berbahagia:</h1>
                    <h3 className='sacramento text-3xl font-bold py-5'>{data?.name?.mens} & {data?.name?.grils}</h3>
                </div>
            </AnimatedSection>
                <div className='pt-20 pb-10 text-white text-center m-auto'>
                    <FaWhatsapp  className='fill-current text-center text-2xl m-auto animate-bounce' />
                </div>
        </section>
    )
}
Page8.propTypes = {
    data: PropTypes.string.isRequired
}