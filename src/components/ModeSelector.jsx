import { useNavigate } from 'react-router-dom';

export default function ModeSelector() {
  const navigate = useNavigate();

  return (
    <div style={{minHeight:'100vh',background:'#0d1117',padding:'48px 24px 32px',boxSizing:'border-box'}}>
      
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'64px'}}>
        <span style={{color:'#8899aa',fontSize:'16px',fontWeight:'600'}}>Cobility</span>
        <button style={{background:'transparent',border:'none',cursor:'pointer',color:'white'}} onClick={() => {}}>
          {/* Sun icon for dark mode toggle */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>
      </div>

      <p style={{margin:'0 0 8px',fontSize:'18px',color:'white',fontWeight:'500'}}>Hi Emma,</p>
      <h1 style={{margin:'0 0 40px',fontSize:'36px',fontWeight:'800',lineHeight:'1.2'}}>How can I help you?</h1>

      <div 
        onClick={() => navigate('/plan')}
        style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',borderRadius:'16px',padding:'20px 16px',marginBottom:'24px',position:'relative',minHeight:'120px',cursor:'pointer',width:'100%'}}
      >
        <div style={{color:'#8899aa',fontSize:'16px'}}>Book a taxi to the airport...</div>
        <span style={{position:'absolute',bottom:'16px',right:'16px',fontSize:'24px',color:'white'}}>✦</span>
      </div>

      <div style={{display:'flex',gap:'16px',marginBottom:'64px',justifyContent:'center'}}>
        <button 
          style={{width:'52px',height:'52px',borderRadius:'50%',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',color:'white',fontSize:'24px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button 
          onClick={() => navigate('/plan')}
          style={{width:'52px',height:'52px',borderRadius:'50%',background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',color:'white',fontSize:'20px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
      </div>

      <p style={{margin:'0 0 16px',fontSize:'14px',fontWeight:'600'}}>Next Trip</p>
      <div onClick={() => navigate('/journey')} style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.15)',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',borderRadius:'50px',padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
        <div>
          <p style={{margin:'0 0 4px',fontSize:'12px',color:'#8899aa'}}>11:15-11:30 &nbsp;&nbsp; 8.Mar 2026</p>
          <p style={{margin:0,fontSize:'16px',fontWeight:'700',color:'white'}}>Centrifugevej 374</p>
        </div>
        <div style={{background:'rgba(255,255,255,0.1)',borderRadius:'50px',padding:'10px 18px',fontWeight:'700',fontSize:'16px'}}>
          6:30
        </div>
      </div>

    </div>
  );
}
