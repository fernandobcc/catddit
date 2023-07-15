'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from './ui/Button'
import { signIn } from 'next-auth/react'
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'There is a problem',
        description: 'There is a problem in logging in with Google.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button size="sm" onClick={loginWithGoogle} className="w-full">
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        {'Google'}
      </Button>
    </div>
  )
}

export default UserAuthForm
