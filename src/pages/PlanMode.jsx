import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

const stops = [
  { id:1, time:'11:15-11:30', date:'8.Mar 2026', location:'Centrifugevej 374', lat:55.6761, lng:12.5683, heading:90 },
  { id:2, time:'11:40-12:00', date:'8.Mar 2026', location:'Nørreport St.', lat:55.6833, lng:12.5700, heading:180 },
];

export default function PlanMode() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(180deg,#1a2744 0%,#0d1117 100%)',maxWidth:'430px',margin:'0 auto',padding:'24px 20px 100px',fontFamily:'Inter,sans-serif',color:'white',boxSizing:'border-box'}}>
      
      <div style={{background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'50px',padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
        <span style={{color:'#667788'}}>Where do you want to go?</span>
        <span style={{fontSize:'20px'}}>✦</span>
      </div>

      {/* Avatar row - fixed alignment */}
      <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'20px'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
          <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'#2a3a4a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>👤</div>
          <p style={{margin:0,fontSize:'12px',color:'#aaa'}}>You</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
          <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',cursor:'pointer',color:'white'}}>+</div>
          <p style={{margin:0,fontSize:'12px',color:'transparent'}}>.</p>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'24px',fontSize:'24px'}}>
        <span>🚇</span><span style={{color:'#8899aa',fontSize:'14px'}}>▶</span>
        <span>🛒</span><span style={{color:'#8899aa',fontSize:'14px'}}>▶</span>
        <span>🍴</span><span style={{color:'#8899aa',fontSize:'14px'}}>▶</span>
        <span>🚇</span><span style={{color:'#8899aa',fontSize:'14px'}}>▶</span>
        <span>🏛️</span>
      </div>

      {stops.map((stop, i) => (
        <div key={stop.id}>
          <div style={{background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'16px 20px',marginBottom:'8px',overflow:'hidden'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{margin:'0 0 2px',fontSize:'12px',color:'#8899aa'}}>{stop.time} {stop.date}</p>
                <p style={{margin:0,fontSize:'17px',fontWeight:'700'}}>{stop.location}</p>
              </div>
              <button
                style={{width:'48px',height:'48px',borderRadius:'50%',background: expanded===stop.id ? '#4A9EFF':'#2a3a4a',border:'none',color:'white',fontSize:'11px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px'}}
                onClick={() => setExpanded(expanded===stop.id ? null : stop.id)}
              >
                <span>↻</span><span>360</span>
              </button>
            </div>
            {expanded===stop.id && (
              <iframe
                style={{width:'100%',height:'180px',borderRadius:'12px',marginTop:'12px',border:'none'}}
                src={`https://www.google.com/maps/embed/v1/streetview?key=${MAPS_KEY}&location=${stop.lat},${stop.lng}&heading=${stop.heading}&fov=80`}
                allowFullScreen
              />
            )}
          </div>
          {i < stops.length-1 && <div style={{textAlign:'center',color:'#8899aa',fontSize:'16px',margin:'4px 0'}}>▼</div>}
        </div>
      ))}

      <div style={{background:'transparent',border:'1px dashed rgba(255,255,255,0.2)',borderRadius:'16px',padding:'16px',textAlign:'center',color:'#8899aa',cursor:'pointer',marginBottom:'24px'}}>+ Add stop</div>

      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:'430px',background:'rgba(13,17,23,0.95)',padding:'16px 20px',display:'flex',gap:'12px',alignItems:'center',boxSizing:'border-box'}}>
        <button style={{flex:1,background:'#2a3a4a',border:'none',borderRadius:'50px',padding:'16px',color:'white',cursor:'pointer',textAlign:'left'}}>
          <div style={{fontWeight:'700',fontSize:'16px'}}>Save</div>
          <div style={{fontSize:'11px',color:'#8899aa',marginTop:'2px'}}>Auto save in 1 min ago</div>
        </button>
        <button style={{width:'52px',height:'52px',borderRadius:'50%',background:'#2a3a4a',border:'none',color:'white',fontSize:'22px',cursor:'pointer'}}>✦</button>
      </div>

    </div>
  );
}
