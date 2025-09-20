"use client"
import Loader from '@/components/ui/loader'
import { useMounted } from '@/hooks/use-mounted'

const MountedProvider = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted()
  if (!mounted) return <Loader />
  return children
}

export default MountedProvider