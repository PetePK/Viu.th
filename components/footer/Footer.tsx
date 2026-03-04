export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      backgroundColor: '#242322',
      color: '#999999',
      paddingTop: '48px',
      paddingBottom: '24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--gutter)'
      }}>

        {/* Top Section: App Downloads and Social Media */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '24px'
        }}>

          {/* App Download Buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <a
              href="https://apps.apple.com/th/app/id1036095179?l=th"
              target="_blank"
              rel="nofollow noopener"
              title="Download on the App Store"
              aria-label="Download on the App Store"
              style={{
                display: 'block',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <img
                src="https://www.viu.com/ott/_next/static/media/appStore.2c2e82ff.png"
                alt="Download on the App Store"
                width="135"
                height="40"
                loading="lazy"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.viu.phone&referrer=utm_source%3D"
              target="_blank"
              rel="nofollow noopener"
              title="Get it on Google Play"
              aria-label="Get it on Google Play"
              style={{
                display: 'block',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <img
                src="https://www.viu.com/ott/_next/static/media/googlePlay.b064022f.png"
                alt="Get it on Google Play"
                width="135"
                height="40"
                loading="lazy"
              />
            </a>
            <a
              href="https://appgallery.huawei.com/app/C100499729"
              target="_blank"
              rel="nofollow noopener"
              title="Explore it on AppGallery"
              aria-label="Explore it on AppGallery"
              style={{
                display: 'block',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <img
                src="https://www.viu.com/ott/_next/static/media/huaweiStore.a1f05148.svg"
                alt="Explore it on AppGallery"
                width="135"
                height="40"
                loading="lazy"
              />
            </a>
          </div>

          {/* Social Media Icons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <a
              href="https://www.facebook.com/viuthailand"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#333333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555555'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
              aria-label="Facebook"
            >
              <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="white">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/Viu_TH"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#333333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555555'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
              aria-label="X (Twitter)"
            >
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="white">
                <path d="M17.751 3h3.067l-6.7 7.658L22 21.078h-6.172l-4.833-6.32-5.531 6.32h-3.07l7.167-8.19L2 3h6.328l4.37 5.777L17.75 3Zm-1.076 16.242h1.7L7.404 4.74H5.58l11.094 14.503Z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/viu_th"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#333333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555555'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
              aria-label="Instagram"
            >
              <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="white">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCPdXHv7DKjHqYK7ZOBbNNZQ"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#333333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555555'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
              aria-label="YouTube"
            >
              <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="white">
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.10-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Links and Logo Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '32px',
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          {/* Footer Links - 70% width */}
          <div style={{
            flex: '1 1 auto',
            fontSize: '13px',
            lineHeight: '2',
            color: '#999999'
          }}>
            <a
              href="/ott/th/th/premium?entry=FOOTER_MENU"
              title="Viu พรีเมียม"
              id="viu_premium"
              style={{
                color: '#999999',
                textDecoration: 'none',
                transition: 'color 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                verticalAlign: 'middle',
                position: 'relative',
                top: '-2px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}
            >
              <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <g>
                  <rect x="7" y="13" width="10" height="6" rx="3" fill="#E31C79"></rect>
                  <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="#E31C79"></path>
                </g>
              </svg>
              <bdi>Viu พรีเมียม</bdi>
            </a>
            {' | '}
            <a href="/ott/th/th/campaign/redeem" id="redeem_code" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>รหัส Redeem</bdi></a>
            {' | '}
            <a href="https://help.viu.com/hc/th" target="_blank" rel="noopener noreferrer" id="faq" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>คำถามที่พบบ่อย</bdi></a>
            {' | '}
            <a href="/ott/th/th/copyright-statement/terms-and-conditions?user_level=1" id="tc" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>ข้อตกลงและเงื่อนไข</bdi></a>
            {' | '}
            <a href="http://www.pccw.com/privacy-statement/index.page?locale=en" target="_blank" rel="nofollow noopener" id="ps" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>ข้อมูลความเป็นส่วนตัว</bdi></a>
            {' | '}
            <a href="/ott/th/th/copyright-statement/privacy" id="pics" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>ข้อกำหนดการเก็บรวบรวมข้อมูลส่วนตัว</bdi></a>
            {' | '}
            <a href="/ott/th/th/copyright-statement/anti-discrimination" id="ndnhs" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>นโยบายเรื่องการไม่เลือกปฏิบัติและต่อต้านการล่วงละเมิด</bdi></a>
            {' | '}
            <a href="#" id="contact_us" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>ติดต่อเรา</bdi></a>
            {' | '}
            <a href="/ott/th/th/campaign/connectwithus" id="ad_with_us" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>ลงโฆษณากับ Viu(วิว)</bdi></a>
            {' | '}
            <a href="https://hq.viu.com" target="_blank" rel="nofollow noopener" id="about_viu" style={{ color: '#999999', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}><bdi>เกี่ยวกับ Viu</bdi></a>
          </div>

          {/* PCCW Logo - 30% width */}
          <div style={{
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start'
          }}>
            <svg
              style={{ width: '108px', height: '50px', fill: '#666666' }}
              viewBox="0 0 108 50"
              focusable="false"
              aria-hidden="true"
              aria-label="PCCW"
            >
              <path d="m59.2 26.3 3.2-3.5c-1.7.5-4 1.2-6 1.2-5.1 0-6.6-2.8-6.6-5.1 0-3.7 3.1-7.3 8-7.3 3.1 0 4.6 1.2 5.4 2l2-4.4c-2.8-1.8-7-1.8-7.8-1.8-9.7 0-14.8 5.6-14.8 11.8 0 5 3.7 8.9 10.7 8.9 1.9 0 3.9-.6 4.8-.7l1.1-1.1z"></path>
              <path d="m40.2 26.3 3.2-3.5c-1.7.5-4 1.2-6 1.2-5.1 0-6.6-2.8-6.6-5.1 0-3.7 3.1-7.3 8-7.3 3.1 0 4.6 1.2 5.4 2l2-4.4c-2.8-1.8-7-1.8-7.8-1.8-9.7 0-14.8 5.6-14.8 11.8 0 5 3.7 8.9 10.7 8.9 1.9 0 3.9-.6 4.7-.7l1.2-1.1z"></path>
              <path d="M17.3 8H7.1L1 27.6h7.2l2-6.4c1.2.2 2.6.3 4 .3 1.9 0 4.8-.2 7.2-1.8 2-1.3 3.3-3.6 3.3-5.8.2-3.9-3.9-5.9-7.4-5.9m.2 6.9c-.2.8-1.2 2.2-3.1 2.3-.9.1-2.1.1-2.9-.2l1.4-4.7h2.4c1.2.1 2.7.9 2.2 2.6M85.8 27.6h-7.5l-.2-9.4-4.9 9.4h-8.3L65.3 8h6.8l-.8 11.3L78.2 8h5.1l.8 11.4L89.3 8h7.2zM5.7 33.9h14.4L19 35.3h-5.8l-.3.8h7.9l-1.3 4.2h-1.7l.9-2.8h-6.2l-1.2 3.6H9.5l1.1-3.6H4.4l-.9 2.8H1.8l1-2.8.4-1.4h7.9l.3-.8H5.2zM10.7 43l-.3.9h4.8l.3-.9h-4.8zm-2.1.9.3-.9H4.1l-.3.9h4.8zM9.7 46h4.8l.3-1H10l-.3 1zm-6.6 0h4.8l.3-1H3.4l-.3 1zm11.8 1.3H9.3c0 .1-.1.2-.1.3 0 .1-.1.3 0 .4.1.3.5.4 1.1.4h7l-1.1 1.4H9.8c-1.9 0-2.2-.5-2.4-1.1-.1-.3-.1-.6 0-.9 0-.2.1-.5.1-.6H1l1.8-5.5H17.5l-1.8 5.5h-.8zM24 49h-1.7l1.9-5.8h6.2L28.6 49H24zm1.4-4.5-1 3h2.9l1-3h-2.9zM42.5 33.9 38 47.7c-.3.9 1.2 1 1.8 1l-1 1.3s-3.4.3-2.5-2.4c.1-.3 2.8-8.7 4-12.2h-2.8c-.4 1.2-.9 2.8-1.6 4.6h2.7l-1.2 1.5h-2.1c-1.2 3.1-2.8 6.4-4.3 8.4h-2.4c2-2.1 3.6-5.4 4.9-8.4h-1.4l.5-1.5H34c.7-1.8 1.2-3.5 1.6-4.6H34l.5-1.5H42.5zM53.4 38.6c.3.2.7.5 1.2.9.6-.5 1.2-1 1.7-1.5h-5c-.8 1.6-2 3.3-4 4.8H45c2.8-2.2 4.7-4.4 5.6-7.5h-2.2l.5-1.5H62.6l-.9 2.8h2.1l-.9 2.8c-.9 2.8-2 3.9-4 3.5L57.6 41c1 .5 2.2.6 2.6.1.2-.3.7-1.6.7-1.7l.5-1.4h-2l.9-2.7h-7.9c-.1.4-.3.8-.4 1.3h7.5c-1.1 1.5-2.4 2.8-3.7 3.9.9.8 1.8 1.7 2.3 2.3h-2.3c-.5-.5-.9-1-1.3-1.4-1.1.8-1.9 1.2-2.2 1.4h-3.5c1.5-.5 3.2-1.4 4.7-2.4-.8-.7-1.3-1.1-2.2-1.8h2.1zM48.2 44.9 47 48.5h2.3l1.2-3.6h-2.3zm12.6-1.2-.3.9.3-.9zm0 0-.3.9-.1.3-1.2 3.6h2.3l-1 1.3H43l.4-1.3h1.8l1.6-4.8v-.1h14v.1zm-7.4 4.8 1.2-3.6h-2.3l-1.2 3.6h2.3zm3-3.6-1.2 3.6h2.3l1.2-3.6h-2.3zM70.7 41.7c-.7 1.1-1.7 2.4-3 3.5h-2.2c2.4-2.1 4.1-4.2 4.8-5.5H68l.5-1.6h3.3l.9-2.6h-2.9l.5-1.6H77.6l-1.3 1.6h-1.9l-.9 2.6h3.1l-1.3 1.6h-2.1c.8 1.1 1.5 2.5 2 3.7h-1.7c-.3-.9-.7-1.6-.9-2.1l-2.8 8.6H68l2.7-8.2z"></path>
              <path d="m85.8 33.9-3.3 10h2.4l-1.3 1.6H82l-1.4 4.4h-1.8l1.4-4.4h-6l.5-1.6h6l3.3-10z"></path>
              <path d="M78.5 36.1h4.2l-1.2 1.6h-4.2zM77.2 39.9h4.2l-1.2 1.6H76zM27.2 33.9h6.4l-1.1 1.4h-5.7zM25.9 36.1h7.6l-1.2 1.5h-6.9zM25.7 38.5h6.4L31 39.9h-5.7zM25 40.8h6.3l-1.1 1.4h-5.7zM13.4 38.1h4.5l-.9 1.1h-4.5zM12.8 40h4.5l-.9 1.1h-4.5zM5.3 38.1h4.5l-.9 1.1H4.5zM4.7 40h4.5l-.9 1.1H3.8zM97.6 4.8c0-2.7 2.2-4.8 4.8-4.8 2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8-2.7.1-4.8-2.1-4.8-4.8m8.9 0c0-2.3-1.8-4.1-4.1-4.1s-4.1 1.8-4.1 4.1 1.8 4.1 4.1 4.1 4.1-1.8 4.1-4.1m-4-2.9c1.7 0 2 .9 2 1.7 0 .7-.5 1.4-1.4 1.5l1.2 2.8h-.8l-1.2-2.7h-1.2V8h-.7V2h2.1zm-1.4 2.7h1c1.2 0 1.4-.4 1.4-1 0-.8-.5-1-1.3-1h-1.1v2z"></path>
            </svg>
          </div>
        </div>

        {/* Copyright and Regional Links */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid #333333'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#666666',
            marginBottom: '8px'
          }} id="copy_right">
            © 2026 PCCW OTT (Thailand) Company Limited. All Rights Reserved.
          </div>
          <div style={{
            fontSize: '11px',
            color: '#666666',
            lineHeight: '1.6'
          }} id="footer_region_list">
            Viu OTT: <a href="https://www.viu.com/ott/hk" title="Viu HK 電影劇集" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>HK</a> | <a href="https://www.viu.com/ott/sg/zh" title="Viu SG 电影剧集" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>SG</a> | <a href="https://www.viu.com/ott/ph" title="Viu PH Dubbed Movies & TV Shows" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>PH</a> | <a href="https://www.viu.com/ott/th" title="Viu TH ซีรีส์, หนังดัง, วาไรตี้" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>TH</a> | <a href="https://www.viu.com/ott/my" title="Viu MY Drama & Filem" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>MY</a> | <a href="https://www.viu.com/ott/id" title="Viu ID Drama & Film" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>ID</a> | <a href="https://www.viu.com/ott/om" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>OM</a> | <a href="https://www.viu.com/ott/kw" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>KW</a> | <a href="https://www.viu.com/ott/bh" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>BH</a> | <a href="https://www.viu.com/ott/sa" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>SA</a> | <a href="https://www.viu.com/ott/qa" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>QA</a> | <a href="https://www.viu.com/ott/ye" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>YE</a> | <a href="https://www.viu.com/ott/ae" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>AE</a> | <a href="https://watch.viu.com/ott/eg" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>EG</a> | <a href="https://www.viu.com/ott/ma" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>MA</a> | <a href="https://www.viu.com/ott/sd" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>SD</a> | <a href="https://www.viu.com/ott/tn" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>TN</a> | <a href="https://www.viu.com/ott/dz" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>DZ</a> | <a href="https://www.viu.com/ott/iq" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>IQ</a> | <a href="https://www.viu.com/ott/lb" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>LB</a> | <a href="https://www.viu.com/ott/ps" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>PS</a> | <a href="https://www.viu.com/ott/jo" title="Viu AR OTT" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>JO</a> | <a href="https://www.viu.com/ott/za" title="Viu ZA Soapies & Dramas" style={{ color: '#666666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>ZA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
