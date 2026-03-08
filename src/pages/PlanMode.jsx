import { useNavigate } from 'react-router-dom';

const stops = [
  { id:1, time:'11:15-11:30', date:'8.Mar 2026', location:'Centrifugevej 374' },
  { id:2, time:'11:40-12:00', date:'8.Mar 2026', location:'Nørreport St.' },
];

export default function PlanMode() {
  const navigate = useNavigate();
  const s = {
    page:{minHeight:'100vh',background:'linear-gradient(180deg,#1a2744 0%,#0d1117 100%)',maxWidth:'430px',margin:'0 auto',padding:'24px 20px 100px',fontFamily:'Inter,sans-serif',color:'white',boxSizing:'border-box'},
    searchBar:{width:'100%',background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'50px',padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px',cursor:'pointer'},
    avatarRow:{display:'flex',gap:'12px',alignItems:'flex-end',marginBottom:'20px'},
    avatar:{width:'56px',height:'56px',borderRadius:'50%',background:'#2a3a4a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'},
    plusCircle:{width:'56px',height:'56px',borderRadius:'50%',background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',cursor:'pointer',color:'white'},
    iconRow:{display:'flex',alignItems:'center',gap:'8px',marginBottom:'24px',fontSize:'24px'},
    arrow:{color:'#8899aa',fontSize:'14px'},
    stopCard:{background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'},
    btn360:{width:'48px',height:'48px',borderRadius:'50%',background:'#2a3a4a',border:'none',color:'white',fontSize:'11px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px'},
    chevron:{textAlign:'center',color:'#8899aa',fontSize:'16px',margin:'4px 0'},
    addCard:{background:'transparent',border:'1px dashed rgba(255,255,255,0.2)',borderRadius:'16px',padding:'16px',textAlign:'center',color:'#8899aa',cursor:'pointer',marginBottom:'24px'},
    bottomBar:{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:'430px',background:'rgba(13,17,23,0.95)',padding:'16px 20px',display:'flex',gap:'12px',alignItems:'center',boxSizing:'border-box'},
    saveBtn:{flex:1,background:'#2a3a4a',border:'none',borderRadius:'50px',padding:'16px',color:'white',cursor:'pointer',textAlign:'left'},
    sparkleBtn:{width:'52px',height:'52px',borderRadius:'50%',background:'#2a3a4a',border:'none',color:'white',fontSize:'22px',cursor:'pointer'},
  };
  return (
    <div style={s.page}>
      <div style={s.searchBar}>
        <span style={{color:'#667788'}}>Where do you want to go?</span>
        <span style={{fontSize:'20px'}}>✦</span>
      </div>
      <div style={s.avatarRow}>
        <div style={{textAlign:'center'}}>
          <div style={s.avatar}>👤</div>
          <p style={{margin:'4px 0 0',fontSize:'12px',color:'#aaa'}}>You</p>
        </div>
        <div style={s.plusCircle}>+</div>
      </div>
      <div style={s.iconRow}>
        <span>🚇</span><span style={s.arrow}>▶</span>
        <span>🛒</span><span style={s.arrow}>▶</span>
        <span>🍴</span><span style={s.arrow}>▶</span>
        <span>🚇</span><span style={s.arrow}>▶</span>
        <span>🏛️</span>
      </div>
      {stops.map((stop, i) => (
        <div key={stop.id}>
          <div style={s.stopCard}>
            <div>
              <p style={{margin:'0 0 2px',fontSize:'12px',color:'#8899aa'}}>{stop.time} {stop.date}</p>
              <p style={{margin:0,fontSize:'17px',fontWeight:'700'}}>{stop.location}</p>
            </div>
            <button style={s.btn360}>
              <span>↻</span>
              <span>360</span>
            </button>
          </div>
          {i < stops.length-1 && <div style={s.chevron}>▼</div>}
        </div>
      ))}
      <div style={s.addCard}>+ Add stop</div>
      <div style={s.bottomBar}>
        <button style={s.saveBtn}>
          <div style={{fontWeight:'700',fontSize:'16px'}}>Save</div>
          <div style={{fontSize:'11px',color:'#8899aa',marginTop:'2px'}}>Auto save in 1 min ago</div>
        </button>
        <button style={s.sparkleBtn}>✦</button>
      </div>
    </div>
  );
}
