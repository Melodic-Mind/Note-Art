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
        sidebarDepth: 0,
        repo:         'seanitzel/note-art',
        locales:      {
            '/': {
                nav:     [
                    {
                        text: 'Home',
                        link: '/',
                    },
                    {
                        text: 'Demo',
                        link: 'https://note-art-demo.netlify.com/',
                    },
                ],
                // Add the generated sidebar
                sidebar: {
                    ...sidebarTree(),
                },
            },
        },
    },
}
