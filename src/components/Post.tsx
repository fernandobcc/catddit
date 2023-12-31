import { formatTimeToNow } from '@/lib/utils'
import { Post, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import { useRef } from 'react'
import Link from 'next/link'
import EditorOutput from './EditorOutput'
import PostVoteClient from './post-vote/PostVoteClient'
import { VoteType } from '@prisma/client'

interface PostProps {
  subredditName: string
  post: Post & {
    author: User
    votes: Vote[]
  }
  commentAmt: number
  votesAmt: number
  currentVote?: VoteType
}

const Post = ({
  subredditName,
  post,
  commentAmt,
  votesAmt,
  currentVote
}: PostProps) => {
  const pRef = useRef<HTMLDivElement>(null)
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initialVotesAmt={votesAmt}
          initialVote={currentVote}
        />
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-gray-500">
            {subredditName ? (
              <>
                <a
                  href={`/r/${subredditName}`}
                  className="underline text-zinc-900 text-sm underline-offset-2"
                >
                  r/{subredditName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span className="text-xs">Posted by u/{post.author.name}</span>
            <span className="ml-2 text-xs">
              {formatTimeToNow(new Date(post.createdAt))}
            </span>
          </div>
          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h2 className="text-lg font-semiboldpy-2 leading-2 text-gray-900">
              {post.title}
            </h2>
          </a>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/r/${subredditName}/post/${post.id}`}
          className="w-fit flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </Link>
      </div>
    </div>
  )
}

export default Post
