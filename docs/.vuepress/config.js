const sidebarTree = (title = 'About') => ({
    '/code/': [
        {
            'title':       'models',
            'collapsable': false,
            'children':    [
                'models/PitchClass',
                'models/Note',
                'models/Chord',
                'models/Scale',
            ],
        },
        {
            'title':       'notation',
            'collapsable': false,
            'children':    [
                'notation/Measure',
                'notation/Score',
                'notation/ScoreHandler',
            ],
        },
        {
            'title':       'instruments',
            'collapsable': false,
            'children':    [
                'instruments/Instrument',
                'instruments/Piano',
                'instruments/Guitar',
                'instruments/Drumset',
            ],
        },
        {
            'title':       'utilities',
            'collapsable': false,
            'children':    [
                'utilities/ScientificFuncs',
                'utilities/MusicalAddons',
                'utilities/Driver',
                'utilities/AudioManager',
            ],
        },
        {
            'title':       'mixins',
            'collapsable': false,
            'children':    [
                'mixins/Instruments',
            ],
        },
    ],
})


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
