import Popover from 'src/components/Popover'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex w-[22%] items-center justify-between'>
        <div className='rounded-full bg-myRed p-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5 text-background lg:h-6 lg:w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
            />
          </svg>
        </div>
        <div className='rounded-full bg-character px-7 py-5 text-background'>
          Trang chủ
        </div>
        <Popover
          lable={
            <div className='flex items-end space-x-2 py-5'>
              <span>Tạo</span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='lg:h-5 lg:w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </span>
            </div>
          }
          lableClassName=''
          subNodeClassName=''
          subNode={
            <div className='rounded-3xl px-5 py-4 shadow-xl'>
              <div className='rounded-xl px-4 py-4 hover:bg-gray-200'>
                Tạo ghim ý tưởng
              </div>
              <div className='rounded-xl px-4 py-4 hover:bg-gray-200'>
                Tạo ghim
              </div>
            </div>
          }
        />
      </div>
      <div className='flex w-[50%] items-center justify-between'>
        <form className='flex bg-gray-100'>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </span>
          <input type='text' />
        </form>
        <NavLink to={'/'}></NavLink>
      </div>
    </div>
  )
}

export default Header
