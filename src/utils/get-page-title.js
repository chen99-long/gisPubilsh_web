import defaultSettings from '@/settings'

const title = defaultSettings.title || 'GIS自学网后台管理员'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}