import { useNavigate } from 'react-router-dom';
import { useCobility } from '../context/CobilityContext';

export default function ModeSelector() {
  const navigate = useNavigate();
  const { isGrayscale, setIsGrayscale } = useCobility();

  const containerStyle = isGrayscale ? { filter: 'grayscale(1)' } : {};

  return (
    <div style={{minHeight:'100vh',background:'#0d1117',padding:'20px 24px 32px',boxSizing:'border-box',...containerStyle}}>

      {/* Top Bar: Logo + Sensory Preferences + Grayscale Toggle */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'48px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{color:'#8899aa',fontSize:'16px',fontWeight:'600'}}>Cobility</span>
          <button
            title="Sensory preferences"
            style={{background:'transparent',border:'none',cursor:'pointer',color:'white',padding:'4px',display:'flex',alignItems:'center',justifyContent:'center'}}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              <path d="M20 8c1.1 0 2-.9 2-2s-.9-2-2-2" opacity="0.6"></path>
              <path d="M18 13.1c.6-.6 1.4-1 2.3-1 1.7 0 3 1.3 3 3 0 1.7-1.3 3-3 3-.9 0-1.7-.4-2.3-1" opacity="0.6"></path>
            </svg>
          </button>
        </div>
        <button
          onClick={() => setIsGrayscale(!isGrayscale)}
          title={isGrayscale ? 'Enable colors' : 'Grayscale mode'}
          style={{background:'transparent',border:'none',cursor:'pointer',color:'white',padding:'4px',display:'flex',alignItems:'center',justifyContent:'center',opacity:isGrayscale ? 1 : 0.7,transition:'opacity 200ms'}}
        >
          {isGrayscale ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
              <path d="M12 7v5l3 3"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Greeting */}
      <div style={{marginBottom:'40px'}}>
        <p style={{margin:'0 0 8px',fontSize:'18px',color:'white',fontWeight:'500'}}>Hi Emma,</p>
        <h1 style={{margin:0,fontSize:'32px',fontWeight:'800',lineHeight:'1.2',color:'white'}}>Choose your mode</h1>
      </div>

      {/* Two Large Mode Buttons Side by Side */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'60px'}}>
        {/* Plan Mode Button */}
        <button
          onClick={() => navigate('/plan')}
          style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',borderRadius:'20px',padding:'32px 20px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px',minHeight:'200px',transition:'all 200ms ease',position:'relative',overflow:'hidden'}}
          onMouseEnter={(e) => {e.target.style.background = 'rgba(255,255,255,0.12)';e.target.style.borderColor = 'rgba(255,255,255,0.25)';}}
          onMouseLeave={(e) => {e.target.style.background = 'rgba(255,255,255,0.08)';e.target.style.borderColor = 'rgba(255,255,255,0.15)';}}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'white'}}>
            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <div style={{textAlign:'center'}}>
            <p style={{margin:'0 0 4px',fontSize:'18px',fontWeight:'700',color:'white'}}>Plan Mode</p>
            <p style={{margin:0,fontSize:'12px',color:'#8899aa',lineHeight:'1.4'}}>Prepare your route in detail</p>
          </div>
        </button>

        {/* Go Mode Button */}
        <button
          onClick={() => navigate('/go')}
          style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',borderRadius:'20px',padding:'32px 20px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px',minHeight:'200px',transition:'all 200ms ease',position:'relative',overflow:'hidden'}}
          onMouseEnter={(e) => {e.target.style.background = 'rgba(255,255,255,0.12)';e.target.style.borderColor = 'rgba(255,255,255,0.25)';}}
          onMouseLeave={(e) => {e.target.style.background = 'rgba(255,255,255,0.08)';e.target.style.borderColor = 'rgba(255,255,255,0.15)';}}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'white'}}>
            <polyline points="22 4 12 14.01 9 11"></polyline>
            <polyline points="7 20 2 20 2 3 21 3 21 10"></polyline>
          </svg>
          <div style={{textAlign:'center'}}>
            <p style={{margin:'0 0 4px',fontSize:'18px',fontWeight:'700',color:'white'}}>Go Mode</p>
            <p style={{margin:0,fontSize:'12px',color:'#8899aa',lineHeight:'1.4'}}>Navigate now, step by step</p>
          </div>
        </button>
      </div>

      {/* Next Trip Card */}
      <div>
        <p style={{margin:'0 0 12px',fontSize:'13px',fontWeight:'600',color:'#8899aa',textTransform:'uppercase',letterSpacing:'0.5px'}}>Next Trip</p>
        <div onClick={() => navigate('/journey')} style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',borderRadius:'16px',padding:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',transition:'all 200ms ease'}}
          onMouseEnter={(e) => {e.target.style.background = 'rgba(255,255,255,0.12)';e.target.style.borderColor = 'rgba(255,255,255,0.25)';}}
          onMouseLeave={(e) => {e.target.style.background = 'rgba(255,255,255,0.08)';e.target.style.borderColor = 'rgba(255,255,255,0.15)';}}
        >
          <div>
            <p style={{margin:'0 0 6px',fontSize:'12px',color:'#8899aa',fontWeight:'500'}}>11:15–11:30 &nbsp;&nbsp; 8 Mar 2026</p>
            <p style={{margin:0,fontSize:'16px',fontWeight:'700',color:'white'}}>Centrifugevej 374</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.1)',borderRadius:'12px',padding:'8px 16px',fontWeight:'700',fontSize:'14px',color:'white',flexShrink:0}}>
            6:30
          </div>
        </div>
      </div>

    </div>
  );
}
