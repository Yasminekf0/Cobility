// GoMode: ultra-minimalist real-time guidance screen
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Headphones } from 'lucide-react';
import { useCobility } from '../context/CobilityContext.jsx';

const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

function getArrowRotation(direction) {
  if (direction === 'left') return -90;
  if (direction === 'right') return 90;
  return 0;
}

export default function GoMode() {
  const navigate = useNavigate();
  const { steps, currentStepIndex, setCurrentStepIndex } = useCobility();
  const currentStep = steps[currentStepIndex] ?? steps[0];

  const [isPortrait, setIsPortrait] = useState(true);
  const [userPosition, setUserPosition] = useState(null);
  const [geoHeading, setGeoHeading] = useState(null);
  const [isLiveView, setIsLiveView] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Detect orientation (portrait vs landscape)
  useEffect(() => {
    const updateOrientation = () => {
      if (typeof window === 'undefined') return;
      setIsPortrait(window.innerHeight >= window.innerWidth);
    };
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  // Track real user location + heading
  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      return undefined;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading } = position.coords;
        setUserPosition({ lat: latitude, lng: longitude });
        if (typeof heading === 'number' && !Number.isNaN(heading)) {
          setGeoHeading(heading);
        }
      },
      () => {
        // Silently fall back
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const centerLat = (userPosition?.lat ?? currentStep?.location?.lat) ?? 51.5074;
  const centerLng = (userPosition?.lng ?? currentStep?.location?.lng) ?? -0.1278;
  const mapSrc =
    MAP_API_KEY &&
    `https://www.google.com/maps/embed/v1/view?key=${MAP_API_KEY}&center=${centerLat},${centerLng}&zoom=16&maptype=roadmap`;

  const rotation =
    typeof geoHeading === 'number'
      ? geoHeading
      : getArrowRotation(currentStep?.direction);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLiveView(true);
        setCameraError(false);
      } catch (err) {
        setCameraError(true);
        setIsLiveView(false);
      }
    };
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{position:'relative',display:'flex',minHeight:'100vh',flexDirection:'column',background:'transparent',color:'white',fontFamily:'Inter,sans-serif',overflow:'hidden'}}>
      {/* Camera feed */}
      {isLiveView && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{position:'fixed',top:0,left:0,height:'100%',width:'100%',objectFit:'cover',zIndex:0}}
        />
      )}

      {/* map view placeholder if not live */}
      {!isLiveView && (
        <div style={{position:'absolute',inset:0,backgroundColor:'#1a2744',display:'flex',alignItems:'center',justifyContent:'center',color:'#8899aa',fontSize:'14px',zIndex:0}}>
          Map preview (Camera active in production)
        </div>
      )}

      {/* Top Row: Back Button & Instruction Card */}
      <div style={{position:'absolute', top:'16px', left:'16px', right:'16px', zIndex:30, display:'flex', gap:'12px', alignItems:'center'}}>
        <button 
          onClick={() => navigate(-1)} 
          style={{background:'transparent',border:'none',color:'white',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div style={{flex:1, borderRadius:'32px',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',padding:'20px 24px',display:'flex',alignItems:'center',gap:'20px',boxShadow:'0 8px 32px rgba(0,0,0,0.15)'}}>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{height:'40px',width:'40px',color:'white',transform:'rotate(90deg)'}}
          >
            <path d="M9 18v-4.5A4.5 4.5 0 0 1 13.5 9h7.5" />
            <path d="M16 4l5 5-5 5" />
          </svg>
          <div style={{flex:1}}>
            <p style={{margin:'0 0 4px',fontSize:'14px',color:'white',fontWeight:'500'}}>Philip De Langes Allé 10</p>
            <p style={{margin:0,fontSize:'36px',fontWeight:'800',color:'white',lineHeight:1}}>15 m</p>
          </div>
        </div>
      </div>

      {/* Centered arrow + distance */}
      <div style={{pointerEvents:'none',position:'fixed',inset:0,zIndex:10,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg
            viewBox="0 0 24 24"
            fill="white"
            style={{
              height:'100px',
              width:'100px',
              color:'white',
              transition:'transform 500ms ease-out',
              transform: `rotate(${rotation - 90}deg)`,
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
            }}
          >
            <path d="M12 2L22 22L12 18L2 22L12 2Z"/>
          </svg>
          <span style={{position:'absolute',bottom:'-20px',right:'-30px',fontSize:'24px',fontWeight:'800',color:'white',textShadow:'0 2px 8px rgba(0,0,0,0.8)'}}>
            15m
          </span>
        </div>
      </div>

      {/* Sparkle button */}
      <button
        type="button"
        style={{position:'absolute',right:'16px',bottom:'140px',display:'flex',height:'56px',width:'56px',alignItems:'center',justifyContent:'center',borderRadius:'50%',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',color:'white',fontSize:'24px',cursor:'pointer',zIndex:20}}
      >
        ✦
      </button>

      {/* Bottom bar */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:20,display:'flex',alignItems:'center',gap:'12px',background:'rgba(10,15,25,0.7)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',borderRadius:'32px 32px 0 0',borderTop:'1px solid rgba(255,255,255,0.1)',padding:'24px 20px',paddingBottom:'40px',flexDirection:'column'}}>
        <div style={{width:'40px',height:'4px',background:'rgba(255,255,255,0.3)',borderRadius:'2px',marginBottom:'12px'}}></div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',width:'100%'}}>
          <button
            onClick={() => navigate(-1)}
            style={{display:'flex',height:'56px',width:'56px',alignItems:'center',justifyContent:'center',borderRadius:'50%',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',color:'white',cursor:'pointer',flexShrink:0}}
          >
            <X size={28} />
          </button>
          
          <div style={{flex:1,borderRadius:'50px',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',padding:'12px 20px',display:'flex',flexDirection:'column',justifyContent:'center',height:'56px',boxSizing:'border-box'}}>
            <p style={{margin:0,fontWeight:'700',fontSize:'16px'}}>Restaurant</p>
            <p style={{margin:'2px 0 0 0',fontSize:'11px',color:'rgba(255,255,255,0.7)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
              5:00 &nbsp;&nbsp; Philip De Langes Allé 10
            </p>
          </div>
          
          <button
            style={{display:'flex',height:'56px',width:'56px',alignItems:'center',justifyContent:'center',borderRadius:'50%',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',color:'white',cursor:'pointer',flexShrink:0}}
          >
            <Headphones size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

