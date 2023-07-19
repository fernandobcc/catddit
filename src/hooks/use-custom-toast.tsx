import Link from 'next/link'
import { toast } from './use-toast'
import { buttonVariants } from '@/components/ui/Button'

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'You are not logged in.',
      description: 'Please log in to continue.',
      variant: 'destructive',
      action: (
        <Link
          href={'/signin'}
          onClick={() => dismiss()}
          className={buttonVariants({ variant: 'outline' })}
        >
          Login
        </Link>
      )
    })
  }

  return { loginToast }
}
