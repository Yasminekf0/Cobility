import { useNavigate } from 'react-router-dom';

export default function ModeSelector() {
  const navigate = useNavigate();

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(180deg,#1a2744 0%,#0d1117 100%)',maxWidth:'430px',margin:'0 auto',padding:'48px 24px 32px',fontFamily:'Inter,sans-serif',color:'white',boxSizing:'border-box'}}>
      
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'48px'}}>
        <span style={{color:'#8899aa',fontSize:'14px',fontWeight:'600'}}>cobility</span>
        <button style={{background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'8px 10px',cursor:'pointer',color:'white',fontSize:'16px'}}>☀️</button>
      </div>

      <p style={{margin:'0 0 4px',fontSize:'18px',color:'#aabbcc'}}>Hi Emma,</p>
      <h1 style={{margin:'0 0 32px',fontSize:'38px',fontWeight:'800',lineHeight:'1.1'}}>How can I help u</h1>

      <div style={{background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'20px',marginBottom:'20px',position:'relative',minHeight:'90px'}}>
        <p style={{margin:0,color:'#667788',fontSize:'16px'}}>2 hour trip to Nyhavn...</p>
        <span style={{position:'absolute',bottom:'14px',right:'18px',fontSize:'22px'}}>✦</span>
      </div>

      <div style={{display:'flex',gap:'12px',marginBottom:'48px'}}>
        <button 
          style={{width:'52px',height:'52px',borderRadius:'50%',background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.15)',color:'white',fontSize:'24px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
        >+</button>
        <button 
          onClick={() => navigate('/plan')}
          style={{width:'52px',height:'52px',borderRadius:'50%',background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.15)',color:'white',fontSize:'16px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
        >✏️</button>
      </div>

      <p style={{margin:'0 0 12px',fontSize:'14px',fontWeight:'600'}}>Next Trip ---</p>
      <div onClick={() => navigate('/journey')} style={{background:'#1e2a3a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'50px',padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
        <div>
          <p style={{margin:'0 0 2px',fontSize:'12px',color:'#8899aa'}}>11:15-11:30  8.Mar 2026</p>
          <p style={{margin:0,fontSize:'16px',fontWeight:'700'}}>Centrifugevej 374</p>
        </div>
        <span style={{background:'#2a3a4a',borderRadius:'50px',padding:'8px 16px',fontWeight:'700',fontSize:'16px'}}>6:30</span>
      </div>

    </div>
  );
}
