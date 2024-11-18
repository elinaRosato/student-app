import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardHome() {

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/')
  }
    return (
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p>Welcome to your dashboard {user.email}!</p>
      </div>
    );
  }
  