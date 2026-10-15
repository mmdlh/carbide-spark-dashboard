import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Factory, Bell, Maximize, UserRound, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { pages } from '@/lib/platform-data';
export function PlatformShell({children}:{children:ReactNode}) {
 const { pathname } = useLocation();
 const [notification,setNotification] = useState(false);
 const [fullscreen,setFullscreen] = useState(false);
 useEffect(() => { const handler=()=>setFullscreen(Boolean(document.fullscreenElement)); document.addEventListener('fullscreenchange',handler);return()=>document.removeEventListener('fullscreenchange',handler);},[]);
 return <div className="platform"><header className="site-header"><Link to="/" className="brand"><div className="brand-mark"><Factory size={27}/></div><div><h1>电石智控<span className="text-primary"> · </span>智慧工厂</h1><small>CALCIUM CARBIDE · INDUSTRIAL INTELLIGENCE</small></div></Link><nav className="main-nav" aria-label="一级菜单">{pages.map(page=><Link key={page.path} to={page.path} className={`nav-item ${pathname===page.path?'active':''}`}><page.icon strokeWidth={1.6}/><span>{page.short}</span></Link>)}</nav><div className="header-tools"><Button variant="ghost" size="icon" title="消息中心" aria-label="消息中心" onClick={()=>setNotification(true)}><Bell/></Button><Button variant="ghost" size="icon" title={fullscreen?'退出全屏':'全屏显示'} aria-label="全屏显示" onClick={()=>{if(document.fullscreenElement)void document.exitFullscreen();else void document.documentElement.requestFullscreen().catch(()=>{});}}>{fullscreen?<X/>:<Maximize/>}</Button><div className="hidden xl:grid place-items-center rounded-full border border-border bg-surface size-8" title="值班管理员"><UserRound size={16}/></div></div></header>{children}<Dialog open={notification} onOpenChange={setNotification}><DialogContent className="dialog-content"><DialogHeader><DialogTitle>消息中心</DialogTitle><DialogDescription>今日运行通知 · 演示数据</DialogDescription></DialogHeader><div className="events"><div className="event"><Bell/><div><p>3# 循环水泵振动趋势异常，请安排检查</p><small>设备管理 · 14:32</small></div></div><div className="event"><Bell/><div><p>4# 电石炉已完成负荷调整</p><small>生产运行 · 14:18</small></div></div><div className="event"><Bell/><div><p>厂区环保监测数据已完成汇总</p><small>环保监测 · 14:00</small></div></div></div></DialogContent></Dialog></div>;
}
