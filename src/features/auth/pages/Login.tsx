import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authService } from '../../../services/auth';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authService.login({ username, password });
      onLogin();
    } catch (err: any) {
      console.error('Login error:', err);
      setError('密码或账号错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex items-center justify-center p-[20px]">
      <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-[0_20px_40px_rgba(15,23,42,0.06)] p-[40px] md:p-[48px]">
        <div className="flex flex-col items-center justify-center mb-[40px]">
          <div className="w-[56px] h-[56px] bg-[#0f172a] rounded-[16px] flex items-center justify-center shadow-[0_8px_16px_rgba(15,23,42,0.16)] mb-[16px]">
            <strong className="text-[20px] font-black text-white tracking-tight">T<span className="text-[#5fb4ff]">A</span></strong>
          </div>
          <h1 className="text-[26px] font-bold text-[#0f172a] m-0 mb-[6px] tracking-tight">TechAlpha</h1>
          <p className="text-[#64748b] text-[14px] m-0 font-extrabold tracking-widest uppercase">AI Investment OS</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-[20px]">
          <div>
            <label className="block text-[13px] font-bold text-[#334155] mb-[8px]">账号</label>
            <Input 
              type="text" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="h-[48px] rounded-[12px] bg-[#f8fafc]"
              placeholder="请输入账号"
              required
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#334155] mb-[8px]">密码</label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[48px] rounded-[12px] bg-[#f8fafc]"
              placeholder="请输入密码"
              required
            />
          </div>

          {error && <p className="text-red-500 text-[13px] font-medium m-0">{error}</p>}

          <Button 
            type="submit"
            disabled={isLoading}
            className="h-[48px] w-full bg-[#2563eb] text-white rounded-[12px] font-bold text-[15px] hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-all shadow-[0_8px_20px_rgba(37,99,235,0.2)] mt-[10px]"
          >
            {isLoading ? '登录中...' : '登录系统'}
          </Button>
        </form>
      </div>
    </div>
  );
}
