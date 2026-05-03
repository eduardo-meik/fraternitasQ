import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  Network,
  MessagesSquare,
  Users,
  Sparkles,
  ScrollText,
} from "lucide-react";

const QUESTIONNAIRE_PATH = "/questionnaire/main";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs">
              FQ
            </div>
            <span>FraternitasQ</span>
          </div>
          <Link href={QUESTIONNAIRE_PATH}>
            <Button size="sm">
              Participar <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="mx-auto">
            Investigación Aurora de Italia · Metodología Talk to the City
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Dimensiones Latentes de la{" "}
            <span className="text-primary">Fraternidad</span> en el Chile
            Contemporáneo
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Un estudio de sociología computacional que combina Procesamiento de
            Lenguaje Natural (LLM) y Grafos de Conocimiento para cartografiar
            cómo significamos la fraternidad hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href={QUESTIONNAIRE_PATH}>
              <Button size="lg" className="w-full sm:w-auto">
                Comenzar Cuestionario <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="#metodologia">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Conocer la Metodología
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <Badge>El Problema</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Una tensión semántica en la modernidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A pesar de constituir uno de los pilares axiológicos de la
              modernidad republicana, el concepto de Fraternidad ha sido
              históricamente supeditado a las categorías de Libertad e Igualdad.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En el escenario actual de hiperconectividad, oscila entre la{" "}
              <strong className="text-slate-900">solidaridad orgánica</strong>,
              el{" "}
              <strong className="text-slate-900">asociacionismo digital</strong>{" "}
              y el{" "}
              <strong className="text-slate-900">ritualismo iniciático</strong>.
            </p>
          </div>
          <Card className="bg-slate-50 border-dashed">
            <CardContent className="pt-6 space-y-4">
              <ScrollText className="w-8 h-8 text-primary" />
              <p className="italic text-slate-700 leading-relaxed">
                «¿Cómo significan la fraternidad diversos clústeres sociales en
                Chile y qué nodos de consenso emergen como fundamentos para una
                nueva gobernanza social?»
              </p>
              <p className="text-xs text-muted-foreground">
                Pregunta de investigación
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Metodología */}
      <section
        id="metodologia"
        className="bg-slate-100/60 border-y"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge>Metodología</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Talk to the City: del relato al grafo
            </h2>
            <p className="text-muted-foreground">
              Transformamos discursos desestructurados en datos estructurados
              para identificar consensos y puntos de inflexión.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <MessagesSquare className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">Recolección</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Relatos abiertos sobre experiencia vivida, tensiones y visión
                de futuro.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Brain className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">LLM</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Modelos de lenguaje extraen aseveraciones (claims) desde el
                discurso cualitativo.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Network className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">Grafos</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Las claims se conectan en un grafo de conocimiento que revela
                dimensiones latentes.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Sparkles className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">Cruxes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Identificación de puntos de inflexión donde el consenso se
                rompe o se construye.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Justificación */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <Badge>Justificación</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Rehabilitar la fraternidad como cohesión social
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Las metodologías cuantitativas tradicionales no aprehenden la
            riqueza del discurso; las cualitativas carecen de escalabilidad.
            Esta investigación combina ambas para capturar la polifonía del
            constructo a gran escala sin sacrificar la profundidad de la
            narrativa individual.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <Card className="bg-primary text-primary-foreground border-0 shadow-xl">
          <CardContent className="py-10 sm:py-12 text-center space-y-5">
            <Users className="w-10 h-10 mx-auto opacity-90" />
            <h2 className="text-2xl sm:text-3xl font-bold">
              Tu voz es parte del grafo
            </h2>
            <p className="opacity-90 max-w-xl mx-auto">
              Comparte tu experiencia, tensiones y visión de futuro. Tarda
              alrededor de 15 minutos y aporta directamente al estudio.
            </p>
            <Link href={QUESTIONNAIRE_PATH}>
              <Button size="lg" variant="secondary" className="mt-2">
                Comenzar Cuestionario <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-muted-foreground text-center">
          Investigación Aurora de Italia · FraternitasQ ·{" "}
          {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
