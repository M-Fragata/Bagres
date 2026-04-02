import fishAnimation from '../assets/animation/fishCatched.webm'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {

    const navigate = useNavigate()

    return (
        <main className='w-full h-dvh flex flex-col items-center justify-center gap-10 bg-bagre-primaria'>
        <h1 className='text-bagre-terciaria'>Oops! Parece que você foi fisgado!</h1>
        <div className="w-48 h-48 mx-auto">
            <video 
            autoPlay
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover rounded-2xl">
                <source src={fishAnimation} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
        <input 
        className='text-bagre-terciaria border rounded-2xl py-2 px-6 cursor-pointer hover:bg-bagre-secundaria shadow-2xs transition-all duration-200'
        type="button" 
        value="Retorne ao mar" 
        onClick={() => navigate('/')}
        />
        </main>
    )
}