import { describe, it, expect } from 'vitest'
import { NAV_LINKS, SERVICES, CLIENTS, SOCIAL_LINKS } from '../data/content'

describe('content data', () => {
  describe('NAV_LINKS', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(NAV_LINKS)).toBe(true)
      expect(NAV_LINKS.length).toBeGreaterThan(0)
    })

    it('every link has a label and href', () => {
      NAV_LINKS.forEach(link => {
        expect(link).toHaveProperty('label')
        expect(link).toHaveProperty('href')
        expect(link.label).toBeTruthy()
        expect(link.href).toMatch(/^#/)
      })
    })
  })

  describe('SERVICES', () => {
    it('contains exactly 6 services', () => {
      expect(SERVICES).toHaveLength(6)
    })

    it('every service has required fields', () => {
      SERVICES.forEach(s => {
        expect(s).toHaveProperty('id')
        expect(s).toHaveProperty('title')
        expect(s).toHaveProperty('description')
        expect(s).toHaveProperty('icon')
        expect(s).toHaveProperty('image')
      })
    })

    it('all service images use picsum', () => {
      SERVICES.forEach(s => {
        expect(s.image).toContain('picsum.photos')
      })
    })

    it('service ids are unique', () => {
      const ids = SERVICES.map(s => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('service descriptions are non-empty strings', () => {
      SERVICES.forEach(s => {
        expect(typeof s.description).toBe('string')
        expect(s.description.length).toBeGreaterThan(10)
      })
    })
  })

  describe('CLIENTS', () => {
    it('contains exactly 8 clients', () => {
      expect(CLIENTS).toHaveLength(8)
    })

    it('every client has id, name, and logo', () => {
      CLIENTS.forEach(c => {
        expect(c).toHaveProperty('id')
        expect(c).toHaveProperty('name')
        expect(c).toHaveProperty('logo')
      })
    })

    it('all client logos use picsum', () => {
      CLIENTS.forEach(c => {
        expect(c.logo).toContain('picsum.photos')
      })
    })

    it('client ids are unique', () => {
      const ids = CLIENTS.map(c => c.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('client names are non-empty strings', () => {
      CLIENTS.forEach(c => {
        expect(typeof c.name).toBe('string')
        expect(c.name.length).toBeGreaterThan(0)
      })
    })
  })

  describe('SOCIAL_LINKS', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(SOCIAL_LINKS)).toBe(true)
      expect(SOCIAL_LINKS.length).toBeGreaterThan(0)
    })

    it('every social link has label, href, and icon', () => {
      SOCIAL_LINKS.forEach(s => {
        expect(s).toHaveProperty('label')
        expect(s).toHaveProperty('href')
        expect(s).toHaveProperty('icon')
        expect(s.label).toBeTruthy()
        expect(s.icon).toBeTruthy()
      })
    })
  })
})
