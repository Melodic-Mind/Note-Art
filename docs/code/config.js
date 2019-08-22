exports.fileTree    = [
    {'name': 'Lib', 'path': '/Lib', 'fullPath': 'docs/code/Lib'},
    {'name': 'ScorePlayer', 'path': '/ScorePlayer', 'fullPath': 'docs/code/ScorePlayer'},
    {
        'name':     'instruments',
        'children': [
            {'name': 'Cord', 'path': '/Cord', 'fullPath': 'instruments/Cord'},
            {'name': 'Drumset', 'path': '/Drumset', 'fullPath': 'instruments/Drumset'},
            {'name': 'Guitar', 'path': '/Guitar', 'fullPath': 'instruments/Guitar'},
            {'name': 'Instrument', 'path': '/Instrument', 'fullPath': 'instruments/Instrument'},
            {'name': 'Piano', 'path': '/Piano', 'fullPath': 'instruments/Piano'},
        ],
    },
    {
        'name':     'mixins',
        'children': [
            {'name': 'PlayMelodically', 'path': '/PlayMelodically', 'fullPath': 'mixins/PlayMelodically'},
            {'name': 'PlayNotes', 'path': '/PlayNotes', 'fullPath': 'mixins/PlayNotes'},
        ],
    },
    {
        'name':     'notation',
        'children': [
            {'name': 'Measure', 'path': '/Measure', 'fullPath': 'notation/Measure'},
            {'name': 'Score', 'path': '/Score', 'fullPath': 'notation/Score'},
            {'name': 'ScoreHandler', 'path': '/ScoreHandler', 'fullPath': 'notation/ScoreHandler'},
        ],
    },
    {
        'name':     'resources',
        'children': [
            {
                'name':     'MusicTheoryStructures',
                'path':     '/MusicTheoryStructures',
                'fullPath': 'resources/MusicTheoryStructures',
            },
        ],
    },
    {
        'name':     'theory',
        'children': [
            {'name': 'Chord', 'path': '/Chord', 'fullPath': 'theory/Chord'},
            {
                'name':     'GuitarChordPattern',
                'path':     '/GuitarChordPattern',
                'fullPath': 'theory/GuitarChordPattern',
            },
            {'name': 'MusicalPattern', 'path': '/MusicalPattern', 'fullPath': 'theory/MusicalPattern'},
            {'name': 'Note', 'path': '/Note', 'fullPath': 'theory/Note'},
            {'name': 'PitchClass', 'path': '/PitchClass', 'fullPath': 'theory/PitchClass'},
            {'name': 'Scale', 'path': '/Scale', 'fullPath': 'theory/Scale'},
        ],
    },
    {
        'name':     'utilities',
        'children': [
            {
                'name':     'GeneralFunctions',
                'path':     '/GeneralFunctions',
                'fullPath': 'utilities/GeneralFunctions',
            },
            {'name': 'MusicFunctions', 'path': '/MusicFunctions', 'fullPath': 'utilities/MusicFunctions'},
            {
                'name':     'ScientificFunctions',
                'path':     '/ScientificFunctions',
                'fullPath': 'utilities/ScientificFunctions',
            },
        ],
    },
]
exports.sidebarTree = (title = 'Mainpage') => ({
    '/code/': [
        {
            'title':       'API',
            'collapsable': false,
            'children':    [['', '' + title + ''], 'Lib', 'ScorePlayer'],
        },
        {
            'title':       'instruments',
            'collapsable': false,
            'children':    [
                'instruments/Cord',
                'instruments/Drumset',
                'instruments/Guitar',
                'instruments/Instrument',
                'instruments/Piano',
            ],
        },
        {
            'title':       'mixins',
            'collapsable': false,
            'children':    [
                'mixins/PlayMelodically',
                'mixins/PlayNotes',
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
            'title':       'resources',
            'collapsable': false,
            'children':    ['resources/MusicTheoryStructures'],
        },
        {
            'title':       'theory',
            'collapsable': false,
            'children':    [
                'theory/Chord',
                'theory/GuitarChordPattern',
                'theory/MusicalPattern',
                'theory/Note',
                'theory/PitchClass',
                'theory/Scale',
            ],
        },
        {
            'title':       'utilities',
            'collapsable': false,
            'children':    [
                'utilities/GeneralFunctions',
                'utilities/MusicFunctions',
                'utilities/ScientificFunctions',
            ],
        },
    ],
})
