.PHONY: paper.pdf clean wc

all: paper.pdf

wc:
	texcount paper.tex
	texcount sections/*.tex

paper.pdf: paper.tex
	@pdflatex paper
	@bibtex paper
	@pdflatex paper
	@pdflatex paper

clean:
	rm -f *.aux *.bbl *.blg *.fls *.fdb_latexmk sections/*.aux *.toc *.out *.mtc* *.lot *.lof *~  *.log *.maf
	rm -f paper.pdf