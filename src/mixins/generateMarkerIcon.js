export default {
  methods: {
    generateMarkerIcon (letter, color) {
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('x', 0)
      svg.setAttribute('y', 0)
      svg.setAttribute('width', 32)
      svg.setAttribute('height', 47)
      svg.setAttribute('viewBox', '0 0 32 47')
      svg.setAttribute('enable-background', 'new 0 0 32 47')

      let g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

      let g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path1.setAttribute('fill', color || '#4E719F')
      path1.setAttribute('d', 'M16,31C7.7,31,1,24.3,1,16C1,7.7,7.7,1,16,1c8.3,0,15,6.7,15,15C31,24.3,24.3,31,16,31z')
      let path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path2.setAttribute('fill', '#FFFFFF')
      path2.setAttribute('d', 'M16,2c7.7,0,14,6.3,14,14s-6.3,14-14,14S2,23.7,2,16S8.3,2,16,2 M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0L16,0z')
      g1.appendChild(path1)
      g1.appendChild(path2)

      let g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      let path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path3.setAttribute('fill', color || '#4E719F')
      path3.setAttribute('d', 'M16,46.5c-3,0-5.5-2.5-5.5-5.5s2.5-5.5,5.5-5.5c3,0,5.5,2.5,5.5,5.5S19,46.5,16,46.5z M16,39.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S16.8,39.5,16,39.5z')
      let path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path4.setAttribute('fill', '#FFFFFF')
      path4.setAttribute('d', 'M16,36c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S13.2,36,16,36 M16,43c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C14,42.1,14.9,43,16,43 M16,35c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S19.3,35,16,35L16,35z M16,42c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S16.6,42,16,42L16,42z')
      g2.appendChild(path3)
      g2.appendChild(path4)

      let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', 14)
      rect.setAttribute('y', 29)
      rect.setAttribute('width', 4)
      rect.setAttribute('height', 8)
      rect.setAttribute('fill', color || '#4E719F')

      g.appendChild(g1)
      g.appendChild(g2)
      g.appendChild(rect)
      svg.appendChild(g)

      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('transform', 'matrix(1 0 0 1 16 16)')
      text.setAttribute('x', -5)
      text.setAttribute('y', 5)
      text.setAttribute('fill', '#FFFFFF')
      text.setAttribute('font-family', 'Arial')
      text.setAttribute('font-size', 16)
      text.innerHTML = unescape(encodeURIComponent(letter))

      svg.appendChild(text)

      let img = document.createElement('img')
      let s = new window.XMLSerializer().serializeToString(svg)
      img.src = 'data:image/svg+xml;base64,' + window.btoa(s)
      return img.src
    }
  }
}
