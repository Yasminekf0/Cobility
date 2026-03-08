import { useNavigate } from 'react-router-dom';

const stops = [
  { id:1, time:'11:15-11:30', date:'8.Mar 2026', location:'Centrifugevej 374', active:false },
  { id:2, time:'11:40-12:00', date:'8.Mar 2026', location:'Nørreport St.', active:true },
  { id:3, time:'12:00-13:00', date:'8.Mar 2026', location:'Restaurant', active:false },
];

export default function JourneyView() {
  const navigate = useNavigate();
  
  // Reusable circle transport icon
  const TransportIcon = ({ color, char, icon }) => (
    <div style={{width:'32px',height:'32px',borderRadius:'50%',background:color,color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:icon?'18px':'18px',boxShadow:'0 0 0 2px white'}}>
      {char || icon}
    </div>
  );

  const s = {
    page:{minHeight:'100vh',background:'inherit',maxWidth:'430px',margin:'0 auto',padding:'24px 20px 100px',boxSizing:'border-box'},
    searchBar:{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',borderRadius:'50px',padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flex:1},
    iconRow:{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',marginBottom:'32px'},
    arrow:{color:'#8899aa',fontSize:'16px'},
    stopCard:{background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'16px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0',position:'relative',minHeight:'80px'},
    activeCard:{background:'#3b4c6b',border:'1px solid rgba(255,255,255,0.2)'},
    arBtn:{width:'44px',height:'44px',borderRadius:'50%',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',color:'white',fontSize:'11px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px',flexShrink:0},
    activeDot:{position:'absolute',right:'-6px',top:'50%',transform:'translateY(-50%)',width:'12px',height:'12px',borderRadius:'50%',background:'#66ccff',boxShadow:'0 0 0 3px #0d1117'},
    chevron:{textAlign:'center',color:'#556677',fontSize:'20px',margin:'4px 0'},
    bottomBar:{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:'430px',background:'rgba(13,17,23,0.85)',backdropFilter:'blur(16px)',padding:'16px 20px',display:'flex',gap:'12px',alignItems:'center',boxSizing:'border-box',zIndex:10},
    input:{flex:1,background:'#2a3a4a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'50px',padding:'14px 20px',color:'white',fontSize:'16px',outline:'none'},
    sparkleBtn:{width:'52px',height:'52px',borderRadius:'50%',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',color:'white',fontSize:'24px',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'},
  };
  return (
    <div style={s.page}>
      
      {/* Top Row: Back Button & Search Bar */}
      <div style={{display:'flex', gap:'12px', alignItems:'center', marginBottom:'24px', width:'100%'}}>
        <button 
          onClick={() => navigate(-1)} 
          style={{background:'transparent',border:'none',color:'white',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div style={s.searchBar}>
          <input 
            type="text" 
            placeholder="Any Changes?" 
            style={{background:'transparent',border:'none',outline:'none',color:'white',fontSize:'16px',width:'100%'}} 
          />
          <span style={{fontSize:'20px',color:'white',cursor:'pointer'}}>✦</span>
        </div>
      </div>
      <div style={s.iconRow}>
        <TransportIcon color="#E32636" char="M" />
        <span style={s.arrow}>▶</span>
        <TransportIcon color="#B31B1B" char="S" />
        <span style={s.arrow}>▶</span>
        <TransportIcon color="#333" icon="🍴" />
        <span style={s.arrow}>▶</span>
        <TransportIcon color="#E32636" char="M" />
        <span style={s.arrow}>▶</span>
        <TransportIcon color="#333" icon="🏛️" />
      </div>

      <div style={{position:'relative'}}>
        {/* Timeline line */}
        <div style={{position:'absolute',top:'40px',bottom:'40px',right:'-1px',width:'2px',background:'rgba(255,255,255,0.1)',zIndex:0}} />

        {stops.map((stop, i) => (
          <div key={stop.id} style={{position:'relative',zIndex:1}}>
            <div style={{...s.stopCard, ...(stop.active ? s.activeCard : {})}}>
              <div style={{flex:1}}>
                <p style={{margin:'0 0 4px',fontSize:'12px',color:stop.active?'#cceeff':'#8899aa'}}>{stop.time} &nbsp;&nbsp; {stop.date}</p>
                <p style={{margin:0,fontSize:'18px',fontWeight:'700',color:'white'}}>{stop.location}</p>
              </div>
              <button onClick={() => navigate('/go')} style={s.arBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{transform:'rotate(-45deg)',marginBottom:'-2px'}}><path d="M12 2L22 22L12 18L2 22L12 2Z"/></svg>
                <span style={{fontSize:'12px',fontWeight:'bold'}}>AR</span>
              </button>
              {stop.active && <div style={s.activeDot}/>}
            </div>
            {i < stops.length-1 && <div style={s.chevron}>▼</div>}
          </div>
        ))}
      </div>
      
      <div style={{...s.bottomBar, justifyContent:'center'}}>
        <button style={s.sparkleBtn}>✦</button>
      </div>
    </div>
  );
}
