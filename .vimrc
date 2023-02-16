syntax on                   " modo visual/colorido ativo
set showmode                " apresenta o modo de utilizacao atual (command/insert)
set ignorecase              " ignora case sensitive durante a busca
set ruler                   " apresenta a posicao do cursor
set showcmd                 " visualiza comandos incompletos
set smarttab                " trabalha a identacao do arquivo
set sm                      " ativar/desativar as coincidencias
set laststatus=1            " exibe a linha de status
set title                   " habilita o titulo
set term=xterm-256color     " modo do terminal
set smartcase               " modo de pesquisa
set incsearch               " busca incremental
set autoindent              " auto identacao
set smartindent             " identacao
set undolevels=1000         " numero maximo de restore (undo)
set number		    " adiciona numero das linhas
set bg=dark
set paste
set tabstop=2
set shiftwidth=2
set expandtab
autocmd FileType yaml setlocal ai sw=1 et cuc cul
