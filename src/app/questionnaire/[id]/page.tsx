'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2, Clipboard } from "lucide-react";

interface FormData {
  invitationCode: string;
  answer1: string;
  answer2: string;
  answer3: string;
  communityAffiliation: string;
  lodgeOrCommunityName: string;
  ageRange: string;
  gender: string;
  location: string;
  generatedCode: string;
}

const INITIAL_FORM_DATA: FormData = {
  invitationCode: '',
  answer1: '',
  answer2: '',
  answer3: '',
  communityAffiliation: '',
  lodgeOrCommunityName: '',
  ageRange: '',
  gender: '',
  location: '',
  generatedCode: '',
};

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setFormData(prev => ({ ...prev, invitationCode: ref }));
    }
  }, [searchParams]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return true; // Optional invitation code
      case 2:
        return (
          formData.answer1.length >= 200 &&
          formData.answer2.length >= 200 &&
          formData.answer3.length >= 200
        );
      case 3:
        if (formData.communityAffiliation === 'Religiosas' || formData.communityAffiliation === 'Instituciones Filosóficas') {
          return formData.lodgeOrCommunityName.trim().length > 0;
        }
        return formData.communityAffiliation.length > 0;
      case 4:
        return (
          formData.ageRange.length > 0 &&
          formData.gender.length > 0 &&
          formData.location.trim().length > 0
        );
      default:
        return false;
    }
  };

  const handleFinalize = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "respuestas_fraternidad"), {
        experience_lived: formData.answer1 || "",
        limits_and_tensions: formData.answer2 || "",
        future_and_technology: formData.answer3 || "",
        community_affiliation: formData.communityAffiliation || "",
        lodge_name: (formData.communityAffiliation === 'Religiosas' || formData.communityAffiliation === 'Instituciones Filosóficas') 
          ? formData.lodgeOrCommunityName 
          : null,
        age_range: formData.ageRange || "",
        location: formData.location || "",
        gender: formData.gender || "",
        referrer_code: formData.invitationCode || "Orgánico",
        submission_timestamp: serverTimestamp() 
      });

      const generatedSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      setFormData(prev => ({ ...prev, generatedCode: `FRAT-${generatedSuffix}` }));
      setStep(5);
    } catch (error) {
      console.error("Error guardando en Firestore:", error);
      alert("Hubo un error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Bienvenido al Cuestionario</h2>
              <p className="text-muted-foreground">Tu participación es fundamental para nuestra investigación.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invitationCode">Código de Invitación (Opcional)</Label>
                <Input
                  id="invitationCode"
                  placeholder="Ej: EC-001"
                  value={formData.invitationCode}
                  onChange={(e) => handleInputChange('invitationCode', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Tus Relatos</h2>
              <p className="text-muted-foreground">Por favor, comparte tus experiencias con nosotros. Mínimo 200 caracteres por respuesta.</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="answer1">1. Relata una experiencia vivida significativa</Label>
                <Textarea
                  id="answer1"
                  placeholder="Cuéntanos tu historia..."
                  className="min-h-[150px]"
                  value={formData.answer1}
                  onChange={(e) => handleInputChange('answer1', e.target.value)}
                />
                <p className={`text-xs text-right ${formData.answer1.length >= 200 ? 'text-green-600' : 'text-orange-500'}`}>
                  {formData.answer1.length} / 200
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer2">2. Límites y tensiones identificadas</Label>
                <Textarea
                  id="answer2"
                  placeholder="Describe los desafíos o tensiones..."
                  className="min-h-[150px]"
                  value={formData.answer2}
                  onChange={(e) => handleInputChange('answer2', e.target.value)}
                />
                <p className={`text-xs text-right ${formData.answer2.length >= 200 ? 'text-green-600' : 'text-orange-500'}`}>
                  {formData.answer2.length} / 200
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer3">3. Visión de futuro y tecnología</Label>
                <Textarea
                  id="answer3"
                  placeholder="¿Cómo ves el futuro y el rol de la tecnología?"
                  className="min-h-[150px]"
                  value={formData.answer3}
                  onChange={(e) => handleInputChange('answer3', e.target.value)}
                />
                <p className={`text-xs text-right ${formData.answer3.length >= 200 ? 'text-green-600' : 'text-orange-500'}`}>
                  {formData.answer3.length} / 200
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Afiliación</h2>
              <p className="text-muted-foreground">¿A qué tipo de organización te sientes más vinculado?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Tipo de Organización</Label>
                <RadioGroup 
                  value={formData.communityAffiliation} 
                  onValueChange={(v) => handleInputChange('communityAffiliation', v)}
                  className="grid grid-cols-1 gap-4"
                >
                  {['Organizaciones Civiles', 'Religiosas', 'Políticas', 'Instituciones Filosóficas', 'Ninguna'].map((option) => (
                    <div key={option} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent transition-colors">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="flex-1 cursor-pointer font-normal">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {(formData.communityAffiliation === 'Religiosas' || formData.communityAffiliation === 'Instituciones Filosóficas') && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="lodgeName">Nombre de la Logia o Comunidad</Label>
                  <Input
                    id="lodgeName"
                    placeholder="Ingrese el nombre"
                    required
                    value={formData.lodgeOrCommunityName}
                    onChange={(e) => handleInputChange('lodgeOrCommunityName', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Datos Demográficos</h2>
              <p className="text-muted-foreground">Para finalizar, cuéntanos un poco más sobre ti.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Rango de Edad</Label>
                <Select value={formData.ageRange} onValueChange={(v) => handleInputChange('ageRange', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione su rango de edad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25 años</SelectItem>
                    <SelectItem value="26-40">26-40 años</SelectItem>
                    <SelectItem value="41-60">41-60 años</SelectItem>
                    <SelectItem value="60+">60+ años</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Género</Label>
                <Select value={formData.gender} onValueChange={(v) => handleInputChange('gender', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione su género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                    <SelectItem value="Prefiero no decirlo">Prefiero no decirlo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación (Ciudad/País)</Label>
                <Input
                  id="location"
                  placeholder="Ej: Santiago, Chile"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-8 py-8">
            <div className="flex justify-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">¡Muchas Gracias!</h2>
              <p className="text-muted-foreground">Tu respuesta ha sido registrada exitosamente.</p>
            </div>

            <Card className="bg-muted/50 border-dashed">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-sm font-medium">Comparte este código con otros miembros:</p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="text-2xl font-mono bg-background px-4 py-2 rounded border font-bold">
                      {formData.generatedCode}
                    </code>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => {
                        navigator.clipboard.writeText(formData.generatedCode);
                        alert("Código copiado al portapapeles");
                      }}
                    >
                      <Clipboard className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <p className="text-xs text-muted-foreground">
              Puedes cerrar esta pestaña o volver al inicio.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {step < 5 && (
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Paso {step} de 4</span>
              <span>{Math.round((step / 4) * 100)}% Completado</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out" 
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs">
                  FQ
                </div>
                FraternitasQ
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {renderStep()}
          </CardContent>
          {step < 5 && (
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                variant="ghost"
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                disabled={step === 1 || loading}
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> Atrás
              </Button>
              
              {step === 4 ? (
                <Button 
                  onClick={handleFinalize} 
                  disabled={!isStepValid() || loading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Enviando...
                    </>
                  ) : (
                    <>
                      Finalizar y Enviar <CheckCircle2 className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={() => setStep(prev => prev + 1)} 
                  disabled={!isStepValid() || loading}
                >
                  Siguiente <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <QuestionnaireContent />
    </Suspense>
  );
}
