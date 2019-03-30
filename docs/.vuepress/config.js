const {sidebarTree} = require('../code/config')

module.exports = {
    contentLoading: true,
    title:          'Note-Art API',
    description:    'The API for Note-Art JS',
    locales:        {
        '/': {
            title:       'Note-Art JS',
            description: 'Music Theory in code',
        },
    },
    themeConfig:    {
        sidebarDepth: 4,
        locales:      {
            '/': {
                nav:     [
                    {
                        text: 'Home',
                        link: '/',
                    },
                ],
                // Add the generated sidebar
                sidebar: {
                    ...sidebarTree('API'),
                },
            },
        },
    },
}
