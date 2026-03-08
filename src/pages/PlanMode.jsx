import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

const stops = [
  { id:1, time:'11:15-11:30', date:'8.Mar 2026', location:'Centrifugevej 374', lat:55.6761, lng:12.5683, heading:90 },
  { id:2, time:'11:40-12:00', date:'8.Mar 2026', location:'Spaghetteria La Perla', lat:55.6833, lng:12.5700, heading:180 },
];

export default function PlanMode() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  // Reusable circle transport icon (slightly tighter)
  const TransportIcon = ({ color, char, icon }) => (
    <div style={{width:'32px',height:'32px',borderRadius:'50%',background:color,color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:icon?'18px':'18px',boxShadow:'0 0 0 2px white'}}>
      {char || icon}
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'inherit',maxWidth:'430px',margin:'0 auto',padding:'24px 20px 100px',boxSizing:'border-box',position:'relative'}}>
      {/* Top Row: Back Button & Search Bar */}
      <div style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'24px', width:'100%'}}>
        <button 
          onClick={() => navigate(-1)} 
          style={{background:'transparent',border:'none',color:'white',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',borderRadius:'50px',padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flex:1}}>
          <input 
            type="text" 
            placeholder="Where do you want to go?" 
            style={{background:'transparent',border:'none',outline:'none',color:'white',fontSize:'16px',width:'100%'}} 
          />
          <span style={{fontSize:'20px',color:'white',cursor:'pointer'}}>✦</span>
        </div>
      </div>

      {/* Avatar row */}
      <div style={{display:'flex',gap:'16px',alignItems:'center',marginBottom:'24px',justifyContent:'center'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'8px'}}>
          <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'#8899aa',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <p style={{margin:0,fontSize:'14px',color:'white',fontWeight:'500'}}>You</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'8px'}}>
          <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'transparent',border:'1px solid rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',cursor:'pointer',color:'#8899aa'}}>+</div>
          <p style={{margin:0,fontSize:'14px',color:'transparent'}}>.</p>
        </div>
      </div>

      {/* Transport Icon Row (tighter gap) */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',marginBottom:'32px'}}>
        <TransportIcon color="#E32636" char="M" />
        <span style={{color:'#8899aa',fontSize:'16px'}}>▶</span>
        <TransportIcon color="#B31B1B" char="S" />
        <span style={{color:'#8899aa',fontSize:'16px'}}>▶</span>
        <TransportIcon color="#333" icon="🍴" />
        <span style={{color:'#8899aa',fontSize:'16px'}}>▶</span>
        <TransportIcon color="#E32636" char="M" />
        <span style={{color:'#8899aa',fontSize:'16px'}}>▶</span>
        <TransportIcon color="#333" icon="🏛️" />
      </div>

      {stops.map((stop, i) => (
        <div key={stop.id}>
          <div style={{background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'16px 16px',marginBottom:'0',overflow:'hidden',minHeight:'80px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{flex:1}}>
                <p style={{margin:'0 0 4px',fontSize:'12px',color:'#8899aa'}}>{stop.time} &nbsp;&nbsp; {stop.date}</p>
                <p style={{margin:0,fontSize:'18px',fontWeight:'700',color:'white'}}>{stop.location}</p>
              </div>
              <button
                style={{width:'44px',height:'44px',borderRadius:'50%',background:'#2a3a4a',border:'1px solid rgba(255,255,255,0.1)',color:'white',fontSize:'11px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px',flexShrink:0,marginLeft:'12px'}}
                onClick={() => setExpanded(expanded===stop.id ? null : stop.id)}
              >
                <span style={{fontSize:'12px',fontWeight:'bold'}}>360</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
              </button>
            </div>
            {expanded===stop.id && (
              <iframe
                style={{width:'100%',height:'180px',borderRadius:'12px',marginTop:'16px',border:'none'}}
                src={`https://www.google.com/maps/embed/v1/streetview?key=${MAPS_KEY}&location=${stop.lat},${stop.lng}&heading=${stop.heading}&fov=80`}
                allowFullScreen
              />
            )}
          </div>
          {i < stops.length-1 && <div style={{textAlign:'center',color:'#556677',fontSize:'20px',margin:'4px 0'}}>▼</div>}
        </div>
      ))}

      <div style={{textAlign:'center',color:'#556677',fontSize:'20px',margin:'4px 0'}}>▼</div>

      <div style={{background:'transparent',border:'1px dashed rgba(255,255,255,0.2)',borderRadius:'16px',padding:'24px 16px',textAlign:'center',color:'#8899aa',cursor:'pointer',marginBottom:'24px',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px'}}>
        <div style={{fontSize:'24px'}}>+</div>
        <div>Add stop</div>
      </div>

      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:'430px',background:'rgba(13,17,23,0.85)',backdropFilter:'blur(16px)',padding:'16px 20px',display:'flex',gap:'12px',alignItems:'center',boxSizing:'border-box',zIndex:10}}>
        <button style={{flex:1,background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',borderRadius:'50px',padding:'14px 20px',color:'white',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <div style={{fontWeight:'700',fontSize:'18px'}}>Start</div>
          <div style={{fontSize:'11px',color:'#8899aa',marginTop:'2px'}}>Ready to navigate</div>
        </button>
        <button style={{width:'52px',height:'52px',borderRadius:'50%',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',color:'white',fontSize:'24px',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>✦</button>
      </div>

    </div>
  );
}
